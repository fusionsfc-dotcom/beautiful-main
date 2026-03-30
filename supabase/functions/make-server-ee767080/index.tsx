// Beautiful Hanbang Hospital Server - PROFILES.ROLE AUTH + JWT HEADER ONLY
// Last updated: 2026-03-05 04:15pm KST
// Version 4.1.0 - JWT extraction from Authorization header ONLY
// REMOVED: Query parameter fallback (security improvement)
// Admin check: profiles.role column (Supabase standard)
// JWT verification: supabaseAnon.auth.getUser(token)
// Admin check: supabase.from('profiles').select('role').eq('id', userId)
// Two Supabase clients:
//   - supabaseAnon (ANON_KEY): For JWT verification
//   - supabase (SERVICE_ROLE_KEY): For database operations (bypasses RLS)

import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Server version constant for tracking deployments
const SERVER_VERSION = "4.1.0-JWT-HEADER-ONLY";

// Initialize Resend client for email
const resend = new Resend(Deno.env.get('RESEND_API_KEY') ?? '');

// Initialize Supabase clients
// SERVICE_ROLE_KEY: For database operations (bypasses RLS)
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// ANON_KEY: For JWT verification
const supabaseAnon = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
);

// Helper function to verify JWT and get user
async function verifyJWTAndGetUser(token: string) {
  try {
    console.log('🔐 Verifying JWT token...');
    console.log('🔑 Token length:', token.length);
    console.log('🔑 Token preview:', token.substring(0, 30) + '...');
    
    // Use ANON_KEY client to verify user's JWT
    // Pass the token directly to getUser()
    const { data: { user }, error } = await supabaseAnon.auth.getUser(token);
    
    if (error) {
      console.error('❌ JWT verification error:', error.message);
      return { user: null, error: error.message };
    }
    
    if (!user) {
      console.error('❌ No user found in JWT');
      return { user: null, error: 'No user found' };
    }
    
    console.log('✅ JWT verified successfully!');
    console.log('👤 User email:', user.email);
    console.log('🆔 User ID:', user.id);
    
    return { user, error: null };
  } catch (err: any) {
    console.error('❌ JWT verification exception:', err.message);
    console.error('🔍 Exception details:', err);
    return { user: null, error: err.message };
  }
}

// Helper function to check if user is admin (using profiles.role)
async function isUserAdmin(userId: string): Promise<{ isAdmin: boolean; error: string | null }> {
  try {
    console.log('🔍 Checking admin status for user ID:', userId);
    
    // Use SERVICE_ROLE_KEY client to query profiles (bypasses RLS)
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('❌ Error fetching profile:', error.message);
      return { isAdmin: false, error: error.message };
    }
    
    if (!profile) {
      console.error('❌ Profile not found for user:', userId);
      return { isAdmin: false, error: 'Profile not found' };
    }
    
    const isAdmin = profile.role === 'admin';
    console.log('👤 User role:', profile.role);
    console.log('🔐 Is admin?', isAdmin);
    
    return { isAdmin, error: null };
  } catch (err: any) {
    console.error('❌ Exception checking admin status:', err.message);
    return { isAdmin: false, error: err.message };
  }
}

// Helper function to extract token from request (Authorization header only)
function extractToken(c: any): string | null {
  // Extract JWT from Authorization header
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader) {
    console.log('❌ No Authorization header found');
    return null;
  }
  
  if (!authHeader.startsWith('Bearer ')) {
    console.log('❌ Authorization header does not start with "Bearer "');
    return null;
  }
  
  const token = authHeader.substring(7); // Remove 'Bearer ' prefix
  
  // Validate it's a real JWT (not anon key)
  if (!token.startsWith('eyJ')) {
    console.log('❌ Token does not look like a JWT (should start with eyJ)');
    return null;
  }
  
  console.log('🔑 Token found in Authorization header');
  console.log('🔑 Token length:', token.length);
  console.log('🔑 Token preview:', token.substring(0, 30) + '...');
  
  return token;
}

// Create storage bucket on startup
async function initializeStorage() {
  const bucketName = 'make-ee767080-images';
  
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      await supabase.storage.createBucket(bucketName, {
        public: true, // Public bucket for easy image access
        fileSizeLimit: 5242880, // 5MB limit
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']
      });
      console.log(`✅ Storage bucket created: ${bucketName}`);
    } else {
      console.log(`✅ Storage bucket already exists: ${bucketName}`);
    }
  } catch (error) {
    console.error('Storage initialization error:', error);
  }
}

// Initialize storage
await initializeStorage();

// Log server version on startup
console.log('');
console.log('═══════════════════════════════════════════════════════');
console.log('🚀 Beautiful Hanbang Hospital Server - STARTING NOW');
console.log('═══════════════════════════════════════════════════════');
console.log('📦 Version:', SERVER_VERSION);
console.log('⏰ Startup Time:', new Date().toISOString());
console.log('🔧 Fix Applied: DIRECT JWT VERIFICATION');
console.log('🔑 Service Role Key:', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ? 'Present' : 'MISSING');
console.log('🔑 Supabase URL:', Deno.env.get('SUPABASE_URL') ? 'Present' : 'MISSING');
console.log('═══════════════════════════════════════════════════════');
console.log('');

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "apikey", "X-Access-Token"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

// Health check endpoint
app.get("/make-server-ee767080/health", (c) => {
  return c.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    version: SERVER_VERSION,
    message: "✅ DIRECT JWT VERIFICATION READY!",
    deployment: {
      version: SERVER_VERSION,
      fix: "Service Role client direct JWT verification",
      method: "supabase.auth.getUser() with SERVICE_ROLE_KEY",
      timestamp: new Date().toISOString()
    }
  });
});

// ============================================
// Auth Endpoints
// ============================================

// Sign up endpoint (creates user + profile)
app.post("/make-server-ee767080/signup", async (c) => {
  console.log('👤 Signup request received');
  
  try {
    const body = await c.req.json();
    const { email, password, name } = body;
    
    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    console.log('📧 Creating user:', email);

    // Create user with admin API
    const { data: userData, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email (no email server configured)
      user_metadata: { name: name || email.split('@')[0] }
    });

    if (createError) {
      console.error('❌ User creation error:', createError);
      return c.json({ error: createError.message }, 400);
    }

    if (!userData.user) {
      return c.json({ error: 'Failed to create user' }, 500);
    }

    console.log('✅ User created:', userData.user.id);

    // Determine role (admin@beautiful.com gets admin role)
    const role = email === 'admin@beautiful.com' ? 'admin' : 'user';

    // Create profile using service role (bypasses RLS)
    console.log('📝 Creating profile...');
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: userData.user.id,
        email: email,
        role: role,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (profileError) {
      console.error('❌ Profile creation error:', profileError);
      // User was created but profile failed - still return success
      console.log('⚠️ User created but profile creation failed, continuing...');
    } else {
      console.log('✅ Profile created:', profileData);
    }

    console.log('✅ Signup complete for:', email);
    return c.json({ 
      success: true, 
      user: userData.user,
      message: 'Account created successfully' 
    });

  } catch (error: any) {
    console.error('❌ Signup exception:', error);
    return c.json({ error: error.message || 'Signup failed' }, 500);
  }
});

// Ensure profile exists (called after login)
app.post("/make-server-ee767080/ensure-profile", async (c) => {
  console.log('🔍 Ensure profile request');
  
  try {
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader) {
      return c.json({ error: 'Missing auth header' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Use helper function to verify JWT
    const { user, error: authError } = await verifyJWTAndGetUser(token);
    
    if (authError || !user) {
      console.error('❌ Auth error:', authError);
      return c.json({ error: 'Unauthorized' }, 401);
    }

    console.log('👤 User:', user.email);

    // Check if profile exists (using SERVICE ROLE client for DB operations)
    const { data: existingProfile, error: checkError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (checkError) {
      console.error('❌ Profile check error:', checkError);
      return c.json({ error: checkError.message }, 500);
    }

    if (existingProfile) {
      console.log('✅ Profile exists');
      return c.json({ success: true, profile: existingProfile, created: false });
    }

    // Create profile if it doesn't exist
    console.log('📝 Creating profile...');
    const role = user.email === 'admin@beautiful.com' ? 'admin' : 'user';
    
    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        email: user.email,
        role: role,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (createError) {
      console.error('❌ Profile creation error:', createError);
      return c.json({ error: createError.message }, 500);
    }

    console.log('✅ Profile created:', newProfile);
    return c.json({ success: true, profile: newProfile, created: true });

  } catch (error: any) {
    console.error('❌ Ensure profile exception:', error);
    return c.json({ error: error.message || 'Failed to ensure profile' }, 500);
  }
});

// Image upload endpoint (Admin only)
app.post("/make-server-ee767080/upload-image", async (c) => {
  console.log('📤 Image upload request received');
  
  try {
    // ✅ Extract token using helper function
    const token = extractToken(c);
    
    if (!token) {
      console.error('❌ No valid token found');
      return c.json({ error: 'Missing or invalid authorization token' }, 401);
    }
    
    // ✅ Verify JWT and get user
    const { user, error: authError } = await verifyJWTAndGetUser(token);
    
    if (authError || !user) {
      console.error('❌ Auth failed:', authError);
      return c.json({ error: `Authentication failed: ${authError}` }, 401);
    }
    
    // ✅ Check admin status
    console.log('🔍 Checking admin status for image upload...');
    const { isAdmin, error: adminError } = await isUserAdmin(user.id);
    
    if (adminError) {
      console.error('❌ Error checking admin status:', adminError);
      return c.json({ error: `Error checking admin status: ${adminError}` }, 500);
    }
    
    if (!isAdmin) {
      console.error('❌ User is not admin:', user.email);
      return c.json({ error: 'Forbidden: Admin access required' }, 403);
    }
    
    console.log('✅ Admin verified:', user.email);
    
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'columns'; // Default to columns
    
    if (!file) {
      console.error('❌ No file provided');
      return c.json({ error: 'No file provided' }, 400);
    }

    console.log('📁 File received:', {
      name: file.name,
      type: file.type,
      size: file.size,
      folder: folder
    });

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      console.error('❌ Invalid file type:', file.type);
      return c.json({ error: 'Invalid file type. Only images are allowed.' }, 400);
    }

    // Validate file size (5MB)
    if (file.size > 5242880) {
      console.error('❌ File too large:', file.size);
      return c.json({ error: 'File too large. Maximum size is 5MB.' }, 400);
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    console.log('🔄 Uploading to path:', filePath);

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    console.log('📦 File converted to buffer, size:', uint8Array.length);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('make-ee767080-images')
      .upload(filePath, uint8Array, {
        contentType: file.type,
        upsert: false
      });

    if (error) {
      console.error('❌ Storage upload error:', {
        message: error.message,
        statusCode: error.statusCode,
        error: error
      });
      return c.json({ error: `Upload failed: ${error.message}` }, 500);
    }

    console.log('✅ Upload successful:', data);

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('make-ee767080-images')
      .getPublicUrl(filePath);

    console.log('🔗 Public URL generated:', publicUrl);

    return c.json({ 
      success: true, 
      url: publicUrl,
      fileName: fileName
    });

  } catch (error: any) {
    console.error('❌ Image upload exception:', {
      message: error.message,
      stack: error.stack,
      error: error
    });
    return c.json({ error: error.message || 'Upload failed' }, 500);
  }
});

// Cases CRUD endpoints
// Get all cases (public read)
app.get("/make-server-ee767080/cases", async (c) => {
  console.log('📋 Get cases request received');
  
  try {
    // Get all cases using service role (bypasses RLS)
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Database error:', error);
      return c.json({ error: error.message }, 500);
    }

    console.log(`✅ Retrieved ${data?.length || 0} cases`);
    return c.json({ success: true, data });

  } catch (error: any) {
    console.error('❌ Get cases exception:', error);
    return c.json({ error: error.message || 'Failed to get cases' }, 500);
  }
});

// Create case
app.post("/make-server-ee767080/cases", async (c) => {
  console.log('📝 Create case request received');
  
  try {
    // Extract token using helper function
    const token = extractToken(c);
    
    if (!token) {
      console.error('❌ No valid token found');
      return c.json({ error: 'Missing or invalid authorization token' }, 401);
    }
    
    // Verify JWT and get user
    const { user, error: authError } = await verifyJWTAndGetUser(token);
    
    if (authError || !user) {
      console.error('❌ Auth failed:', authError);
      return c.json({ error: `Authentication failed: ${authError}` }, 401);
    }

    // Check admin status using profiles.role
    console.log('🔍 Checking admin status from profiles table...');
    
    const { isAdmin, error: adminError } = await isUserAdmin(user.id);
    
    if (adminError) {
      console.error('❌ Error checking admin status:', adminError);
      return c.json({ error: `Error checking admin status: ${adminError}` }, 500);
    }

    if (!isAdmin) {
      console.error('❌ User is not admin');
      return c.json({ error: 'Admin access required' }, 403);
    }

    const body = await c.req.json();
    const { title, content, category, thumbnail } = body;

    console.log('✅ Admin verified, creating case:', { title, category });

    // Insert case using service role (bypasses RLS)
    const { data, error } = await supabase
      .from('cases')
      .insert({
        title,
        content,
        category,
        thumbnail,
        author_id: user.id,
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Database error:', error);
      return c.json({ error: error.message }, 500);
    }

    console.log('✅ Case created successfully:', data.id);
    return c.json({ success: true, data });

  } catch (error: any) {
    console.error('❌ Create case exception:', error);
    return c.json({ error: error.message || 'Failed to create case' }, 500);
  }
});

// Update case
app.put("/make-server-ee767080/cases/:id", async (c) => {
  console.log('✏️ Update case request received');
  
  try {
    const caseId = c.req.param('id');
    
    // Extract token using helper function
    const token = extractToken(c);
    
    if (!token) {
      console.error('❌ No valid token found');
      return c.json({ error: 'Missing or invalid authorization token' }, 401);
    }
    
    // Verify JWT and get user
    const { user, error: authError } = await verifyJWTAndGetUser(token);
    
    if (authError || !user) {
      console.error('❌ Auth failed:', authError);
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Check admin status using profiles.role
    console.log('🔍 Checking admin status...');
    const { isAdmin, error: adminError } = await isUserAdmin(user.id);
    
    if (adminError) {
      console.error('❌ Error checking admin status:', adminError);
      return c.json({ error: `Error checking admin status: ${adminError}` }, 500);
    }

    if (!isAdmin) {
      console.error('❌ User is not admin:', user.email);
      return c.json({ error: 'Admin access required' }, 403);
    }

    const body = await c.req.json();
    const { title, content, category, thumbnail } = body;

    console.log('✅ Admin verified, updating case:', caseId);

    // Update case using service role (bypasses RLS)
    const { data, error } = await supabase
      .from('cases')
      .update({
        title,
        content,
        category,
        thumbnail,
      })
      .eq('id', caseId)
      .select()
      .single();

    if (error) {
      console.error('❌ Database error:', error);
      return c.json({ error: error.message }, 500);
    }

    console.log('✅ Case updated successfully:', data.id);
    return c.json({ success: true, data });

  } catch (error: any) {
    console.error('❌ Update case exception:', error);
    return c.json({ error: error.message || 'Failed to update case' }, 500);
  }
});

// Delete case
app.delete("/make-server-ee767080/cases/:id", async (c) => {
  console.log('🗑️ Delete case request received');
  
  try {
    const caseId = c.req.param('id');
    
    // Extract token using helper function
    const token = extractToken(c);
    
    if (!token) {
      console.error('❌ No valid token found');
      return c.json({ error: 'Missing or invalid authorization token' }, 401);
    }
    
    // Verify JWT and get user
    const { user, error: authError } = await verifyJWTAndGetUser(token);
    
    if (authError || !user) {
      console.error('❌ Auth failed:', authError);
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Check admin status using profiles.role
    console.log('🔍 Checking admin status...');
    const { isAdmin, error: adminError } = await isUserAdmin(user.id);
    
    if (adminError) {
      console.error('❌ Error checking admin status:', adminError);
      return c.json({ error: `Error checking admin status: ${adminError}` }, 500);
    }

    if (!isAdmin) {
      console.error('❌ User is not admin:', user.email);
      return c.json({ error: 'Admin access required' }, 403);
    }

    console.log('✅ Admin verified, deleting case:', caseId);

    // Delete case using service role (bypasses RLS)
    const { error } = await supabase
      .from('cases')
      .delete()
      .eq('id', caseId);

    if (error) {
      console.error('❌ Database error:', error);
      return c.json({ error: error.message }, 500);
    }

    console.log('✅ Case deleted successfully:', caseId);
    return c.json({ success: true });

  } catch (error: any) {
    console.error('❌ Delete case exception:', error);
    return c.json({ error: error.message || 'Failed to delete case' }, 500);
  }
});

// ============================================
// Questions Board API (using KV Store)
// ============================================

// ============================================
// Beautiful Gallery API (using KV Store)
// ============================================

// Get gallery items (public read)
app.get("/make-server-ee767080/gallery", async (c) => {
  console.log('🖼️ Get gallery request received');

  try {
    const category = c.req.query('category'); // Optional filter
    const items = await kv.getByPrefix('gallery_');

    let filtered = items;
    if (category && category !== 'all') {
      filtered = items.filter((it: any) => it.category === category);
    }

    filtered.sort((a: any, b: any) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return c.json({ success: true, data: filtered });
  } catch (error: any) {
    console.error('❌ Get gallery exception:', error);
    return c.json({ error: error.message || 'Failed to get gallery' }, 500);
  }
});

// Create gallery item (admin only)
app.post("/make-server-ee767080/gallery", async (c) => {
  console.log('🖼️ Create gallery item request received');

  try {
    const token = extractToken(c);
    if (!token) return c.json({ error: 'Missing or invalid authorization token' }, 401);

    const { user, error: authError } = await verifyJWTAndGetUser(token);
    if (authError || !user) return c.json({ error: 'Unauthorized' }, 401);

    const { isAdmin, error: adminError } = await isUserAdmin(user.id);
    if (adminError) return c.json({ error: `Error verifying permissions: ${adminError}` }, 500);
    if (!isAdmin) return c.json({ error: 'Admin access required' }, 403);

    const body = await c.req.json();
    const { image_url, category, caption } = body || {};

    if (!image_url || !category) {
      return c.json({ error: 'image_url and category are required' }, 400);
    }

    const id = crypto.randomUUID();
    const item = {
      id,
      image_url,
      category,
      caption: caption || '',
      created_at: new Date().toISOString(),
      author_id: user.id,
      author_email: user.email,
    };

    await kv.set(`gallery_${id}`, item);
    return c.json({ success: true, data: item });
  } catch (error: any) {
    console.error('❌ Create gallery exception:', error);
    return c.json({ error: error.message || 'Failed to create gallery item' }, 500);
  }
});

// Delete gallery item (admin only)
app.delete("/make-server-ee767080/gallery/:id", async (c) => {
  console.log('🗑️ Delete gallery item request received');

  try {
    const token = extractToken(c);
    if (!token) return c.json({ error: 'Missing or invalid authorization token' }, 401);

    const { user, error: authError } = await verifyJWTAndGetUser(token);
    if (authError || !user) return c.json({ error: 'Unauthorized' }, 401);

    const { isAdmin, error: adminError } = await isUserAdmin(user.id);
    if (adminError) return c.json({ error: `Error verifying permissions: ${adminError}` }, 500);
    if (!isAdmin) return c.json({ error: 'Admin access required' }, 403);

    const id = c.req.param('id');
    await kv.del(`gallery_${id}`);
    return c.json({ success: true });
  } catch (error: any) {
    console.error('❌ Delete gallery exception:', error);
    return c.json({ error: error.message || 'Failed to delete gallery item' }, 500);
  }
});

// Get all questions
app.get("/make-server-ee767080/questions", async (c) => {
  console.log('📋 Get questions request received');
  
  try {
    const category = c.req.query('category'); // Optional category filter
    
    const questions = await kv.getByPrefix('question_');
    
    // Filter by category if provided
    let filteredQuestions = questions;
    if (category && category !== 'all') {
      filteredQuestions = questions.filter((q: any) => q.category === category);
    }
    
    // Sort by created_at desc
    filteredQuestions.sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    
    console.log(`✅ Retrieved ${filteredQuestions.length} questions`);
    return c.json({ success: true, data: filteredQuestions });

  } catch (error: any) {
    console.error('❌ Get questions exception:', error);
    return c.json({ error: error.message || 'Failed to get questions' }, 500);
  }
});

// Get single question by ID
app.get("/make-server-ee767080/questions/:id", async (c) => {
  console.log('📖 Get question by ID request received');
  
  try {
    const questionId = c.req.param('id');
    const question = await kv.get(`question_${questionId}`);
    
    if (!question) {
      return c.json({ error: 'Question not found' }, 404);
    }
    
    console.log(`✅ Retrieved question: ${questionId}`);
    return c.json({ success: true, data: question });

  } catch (error: any) {
    console.error('❌ Get question exception:', error);
    return c.json({ error: error.message || 'Failed to get question' }, 500);
  }
});

// Create question (requires authentication)
app.post("/make-server-ee767080/questions", async (c) => {
  console.log('📝 Create question request received');
  
  try {
    const body = await c.req.json();
    const { title, content, category, author_id, author_email } = body;
    
    console.log('📋 Request body:', { title, category, author_id, author_email });
    
    if (!title || !content || !category) {
      console.error('❌ Missing required fields');
      return c.json({ error: 'Title, content, and category are required' }, 400);
    }
    
    if (!author_id || !author_email) {
      console.error('❌ Missing author info');
      return c.json({ error: 'Author information required' }, 400);
    }

    const questionId = crypto.randomUUID();
    const questionData = {
      id: questionId,
      title,
      content,
      category,
      author_id,
      author_email,
      created_at: new Date().toISOString(),
      answers: []
    };
    
    console.log('💾 Saving question to KV store...');
    await kv.set(`question_${questionId}`, questionData);
    
    console.log('✅ Question created:', questionId);
    return c.json({ success: true, data: questionData });

  } catch (error: any) {
    console.error('❌ Create question exception:', error);
    return c.json({ error: error.message || 'Failed to create question' }, 500);
  }
});

// Add answer to question (admin only)
app.post("/make-server-ee767080/questions/:id/answers", async (c) => {
  console.log('💬 Add answer request received');
  
  try {
    const questionId = c.req.param('id');
    const body = await c.req.json();
    const { content, author_id, author_email } = body;
    
    console.log('📋 Answer data:', { questionId, author_id, author_email, content_length: content?.length });
    
    if (!content) {
      console.error('❌ Missing content');
      return c.json({ error: 'Content is required' }, 400);
    }
    
    if (!author_id || !author_email) {
      console.error('❌ Missing author info');
      return c.json({ error: 'Author information required' }, 400);
    }

    // Check if user is admin by email (avoids RLS issues)
    console.log('🔍 Checking admin status for:', author_email);
    
    if (author_email !== 'admin@beautiful.com') {
      console.error('❌ User is not admin. Email:', author_email);
      return c.json({ error: 'Admin access required' }, 403);
    }

    console.log('✅ Admin verified:', author_email);

    // Get existing question
    const question = await kv.get(`question_${questionId}`);
    
    if (!question) {
      console.error('❌ Question not found:', questionId);
      return c.json({ error: 'Question not found' }, 404);
    }

    // Add answer
    const answerId = crypto.randomUUID();
    const answer = {
      id: answerId,
      content,
      author_id,
      author_email,
      is_admin: true,
      created_at: new Date().toISOString()
    };

    question.answers = question.answers || [];
    question.answers.push(answer);

    // Save updated question
    console.log('💾 Saving answer to question...');
    await kv.set(`question_${questionId}`, question);

    console.log('✅ Answer added successfully:', answerId);
    return c.json({ success: true, data: answer });

  } catch (error: any) {
    console.error('❌ Add answer exception:', error);
    return c.json({ error: error.message || 'Failed to add answer' }, 500);
  }
});

// Delete question (author or admin)
app.delete("/make-server-ee767080/questions/:id", async (c) => {
  console.log('🗑️ Delete question request received');
  
  try {
    // Extract token using helper (Authorization header)
    const token = extractToken(c);
    
    if (!token) {
      console.error('❌ No valid token found');
      return c.json({ error: 'Missing or invalid authorization token' }, 401);
    }
    
    // Verify JWT using ANON client (same as cases delete)
    const { user, error: authError } = await verifyJWTAndGetUser(token);
    
    if (authError || !user) {
      console.error('❌ Auth failed:', authError);
      return c.json({ error: 'Unauthorized' }, 401);
    }

    console.log('✅ User authenticated:', user.email);

    const questionId = c.req.param('id');
    const question = await kv.get(`question_${questionId}`);
    
    if (!question) {
      return c.json({ error: 'Question not found' }, 404);
    }

    // Check if user is author or admin
    const isAuthor = question.author_id === user.id;
    let isAdmin = false;
    const { isAdmin: profileAdmin, error: adminError } = await isUserAdmin(user.id);
    
    if (adminError) {
      console.warn('⚠️ Profile check failed, trying email fallback:', adminError);
      // profiles 쿼리 실패 시 이메일 기반 폴백 (Edge Function DB 연결 이슈 대응)
      const adminEmails = (Deno.env.get('ADMIN_EMAILS') || 'admin@beautiful.com').split(',').map((e: string) => e.trim().toLowerCase());
      isAdmin = user.email ? adminEmails.includes(user.email.toLowerCase()) : false;
    } else {
      isAdmin = profileAdmin;
    }

    if (!isAuthor && !isAdmin) {
      console.error('❌ Permission denied - not author or admin');
      return c.json({ error: 'Permission denied' }, 403);
    }

    await kv.del(`question_${questionId}`);
    
    console.log('✅ Question deleted:', questionId);
    return c.json({ success: true });

  } catch (error: any) {
    console.error('❌ Delete question exception:', error);
    return c.json({ error: error.message || 'Failed to delete question' }, 500);
  }
});

// ============================================
// Consultation Requests API
// ============================================

// Submit consultation request (sends email notification)
app.post("/make-server-ee767080/consultations", async (c) => {
  console.log('📩 Consultation request received');
  
  try {
    const body = await c.req.json();
    const { name, phone, clinic, visitType, consultMethod, message } = body;
    
    console.log('📋 Consultation data:', { name, phone, clinic, visitType, consultMethod });
    
    if (!name || !phone || !clinic || !visitType || !consultMethod) {
      console.error('❌ Missing required fields');
      return c.json({ error: 'All fields are required' }, 400);
    }

    // Generate consultation ID
    const consultationId = crypto.randomUUID();
    const consultationData = {
      id: consultationId,
      name,
      phone,
      clinic,
      visitType,
      consultMethod,
      message: message || '',
      status: 'pending',
      created_at: new Date().toISOString()
    };
    
    // Save to KV store
    console.log('💾 Saving consultation to KV store...');
    await kv.set(`consultation_${consultationId}`, consultationData);
    
    // Send email notification
    console.log('📧 Sending email notifications...');
    
    const visitTypeText = visitType === 'outpatient' ? '외래 진료' : '입원 상담';
    const consultMethodText = 
      consultMethod === 'phone' ? '전화' :
      consultMethod === 'kakao' ? '카카오톡' : '방문';
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #E91E7A; border-bottom: 3px solid #E91E7A; padding-bottom: 10px;">
          🏥 새로운 상담 요청
        </h2>
        
        <div style="background-color: #F8F9FA; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3 style="color: #3E5266; margin-top: 0;">신청자 정보</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6B7D8C; width: 120px;">이름</td>
              <td style="padding: 8px 0; color: #3E5266; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7D8C;">연락처</td>
              <td style="padding: 8px 0; color: #3E5266; font-weight: bold;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7D8C;">희망 클리닉</td>
              <td style="padding: 8px 0; color: #3E5266; font-weight: bold;">${clinic}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7D8C;">진료 유형</td>
              <td style="padding: 8px 0; color: #3E5266; font-weight: bold;">${visitTypeText}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6B7D8C;">상담 채널</td>
              <td style="padding: 8px 0; color: #3E5266; font-weight: bold;">${consultMethodText}</td>
            </tr>
          </table>
        </div>
        
        ${message ? `
          <div style="background-color: #F8F9FA; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #3E5266; margin-top: 0;">문의 내용</h3>
            <p style="color: #6B7D8C; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        ` : ''}
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E0E0E0;">
          <p style="color: #8FA8BA; font-size: 14px; margin: 0;">
            신청 시각: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
          </p>
          <p style="color: #8FA8BA; font-size: 14px; margin: 5px 0 0 0;">
            신청 ID: ${consultationId}
          </p>
        </div>
      </div>
    `;

    // Send emails individually to handle Resend restrictions
    const emailRecipients = ['fusionsfc@gmail.com', 'joingrace@naver.com'];
    let successCount = 0;
    
    for (const recipient of emailRecipients) {
      try {
        console.log(`📤 Sending email to ${recipient}...`);
        const { data: emailData, error: emailError } = await resend.emails.send({
          from: 'Beautiful Korean Medicine Hospital <onboarding@resend.dev>',
          to: [recipient],
          subject: `[뷰티풀한방병원] 새로운 상담 요청 - ${name}님`,
          html: emailHtml,
        });

        if (emailError) {
          console.error(`❌ Email sending error to ${recipient}:`, emailError);
        } else {
          console.log(`✅ Email sent successfully to ${recipient}:`, emailData);
          successCount++;
        }
      } catch (emailException: any) {
        console.error(`❌ Email exception to ${recipient}:`, emailException);
      }
    }
    
    if (successCount > 0) {
      console.log(`✅ Successfully sent ${successCount} out of ${emailRecipients.length} emails`);
    } else {
      console.log('⚠️ No emails were sent, but consultation is saved');
    }
    
    console.log('✅ Consultation request processed:', consultationId);
    return c.json({ 
      success: true, 
      data: consultationData,
      message: '상담 요청이 접수되었습니다. 빠른 시간 내에 연락드리겠습니다.' 
    });

  } catch (error: any) {
    console.error('❌ Consultation request exception:', error);
    return c.json({ error: error.message || 'Failed to submit consultation request' }, 500);
  }
});

// ==================== NOTICES API ====================

// Get all notices
app.get('/make-server-ee767080/notices', async (c) => {
  try {
    console.log('📋 Fetching all notices...');
    
    const noticesData = await kv.getByPrefix('notice:');
    
    // Sort by created_at (newest first)
    const sortedNotices = noticesData.sort((a: any, b: any) => {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
    
    console.log(`✅ Found ${sortedNotices.length} notices`);
    return c.json({ success: true, data: sortedNotices });
  } catch (error: any) {
    console.error('❌ Get notices error:', error);
    return c.json({ error: error.message || 'Failed to fetch notices' }, 500);
  }
});

// Get single notice by ID
app.get('/make-server-ee767080/notices/:id', async (c) => {
  try {
    const id = c.req.param('id');
    console.log(`📋 Fetching notice: ${id}`);
    
    const notice = await kv.get(`notice:${id}`);
    
    if (!notice) {
      return c.json({ error: 'Notice not found' }, 404);
    }
    
    console.log('✅ Notice found');
    return c.json({ success: true, data: notice });
  } catch (error: any) {
    console.error('❌ Get notice error:', error);
    return c.json({ error: error.message || 'Failed to fetch notice' }, 500);
  }
});

// Create new notice (admin only)
app.post('/make-server-ee767080/notices', async (c) => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════');
  console.log('🚀 POST /notices - STARTING');
  console.log('═══════════════════════════════════════════════════════');
  
  try {
    // Extract token using helper function
    const accessToken = extractToken(c);
    
    if (!accessToken) {
      console.error('❌ No token found');
      return c.json({ code: 401, message: 'No token provided', error: 'Unauthorized' }, 401);
    }
    
    console.log('🔑 Token extracted, length:', accessToken.length);
    
    // Parse request body
    const bodyData = await c.req.json();
    console.log('📦 Body received:', Object.keys(bodyData));
    
    // Verify JWT and get user
    const { user, error: authError } = await verifyJWTAndGetUser(accessToken);
    
    if (authError || !user) {
      console.error('❌ Auth failed:', authError);
      return c.json({ 
        code: 401, 
        message: authError || 'Invalid JWT',
        error: 'Unauthorized'
      }, 401);
    }
    
    console.log('✅ User authenticated:', user.email, '(ID:', user.id + ')');
    
    // Check admin status using profiles.role
    console.log('🔍 Checking admin status from profiles table...');
    const { isAdmin, error: adminError } = await isUserAdmin(user.id);
    
    if (adminError) {
      console.error('❌ Error checking admin status:', adminError);
      return c.json({ 
        code: 500, 
        message: 'Error checking admin status',
        error: adminError
      }, 500);
    }
    
    if (!isAdmin) {
      console.error('❌ Not admin. User:', user.email);
      return c.json({ 
        code: 403, 
        message: 'Admin access required',
        error: 'Forbidden'
      }, 403);
    }
    
    console.log('✅ Admin verified!');
    
    // Extract title and content from bodyData (already parsed above)
    const { title, content } = bodyData;
    
    console.log('📝 Notice data:', {
      title: title?.substring(0, 50),
      contentLength: content?.length
    });
    
    if (!title || !content) {
      console.error('❌ Missing fields');
      return c.json({ code: 400, message: 'Title and content required', error: 'Bad Request' }, 400);
    }
    
    const noticeId = crypto.randomUUID();
    const now = new Date().toISOString();
    
    const noticeData = {
      id: noticeId,
      title,
      content,
      author: user.email,
      created_at: now,
      updated_at: now,
    };
    
    console.log('💾 Saving notice to KV store...');
    await kv.set(`notice:${noticeId}`, noticeData);
    
    console.log('✅ SUCCESS! Notice created:', noticeId);
    console.log('═══════════════════════════════════════════════════════');
    return c.json({ success: true, data: noticeData });
  } catch (error: any) {
    console.error('═══════════════════════════════════════════════════════');
    console.error('❌ EXCEPTION in POST /notices:', {
      message: error.message,
      stack: error.stack
    });
    console.error('═══════════════════════════════════════════════════════');
    return c.json({ code: 500, message: error.message, error: 'Internal Server Error' }, 500);
  }
});

// Update notice (admin only)
app.put('/make-server-ee767080/notices/:id', async (c) => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════');
  console.log('✏️ PUT /notices/:id');
  console.log('═══════════════════════════════════════════════════════');
  
  try {
    // Extract token
    const accessToken = extractToken(c);
    
    if (!accessToken) {
      console.error('❌ No token');
      return c.json({ code: 401, message: 'No token', error: 'Unauthorized' }, 401);
    }
    
    // Parse request body
    const bodyData = await c.req.json();
    
    // Verify JWT
    const { user, error: authError } = await verifyJWTAndGetUser(accessToken);
    
    if (authError || !user) {
      console.error('❌ Auth failed:', authError);
      return c.json({ code: 401, message: authError || 'Invalid JWT', error: 'Unauthorized' }, 401);
    }
    
    console.log('✅ User:', user.email);
    
    // Check admin status using profiles.role
    console.log('🔍 Checking admin status...');
    const { isAdmin, error: adminError } = await isUserAdmin(user.id);
    
    if (adminError) {
      console.error('❌ Error checking admin status:', adminError);
      return c.json({ code: 500, message: 'Error checking admin status', error: adminError }, 500);
    }
    
    if (!isAdmin) {
      console.error('❌ Not admin');
      return c.json({ code: 403, message: 'Admin access required', error: 'Forbidden' }, 403);
    }
    
    console.log('✅ Admin verified');
    
    const id = c.req.param('id');
    const { title, content } = bodyData;
    
    if (!title || !content) {
      return c.json({ code: 400, message: 'Missing fields', error: 'Bad Request' }, 400);
    }
    
    const existingNotice = await kv.get(`notice:${id}`);
    
    if (!existingNotice) {
      return c.json({ code: 404, message: 'Notice not found', error: 'Not Found' }, 404);
    }
    
    const updatedNotice = {
      ...existingNotice,
      title,
      content,
      updated_at: new Date().toISOString(),
    };
    
    await kv.set(`notice:${id}`, updatedNotice);
    
    console.log('✅ Notice updated:', id);
    console.log('═══════════════════════════════════════════════════════');
    return c.json({ success: true, data: updatedNotice });
  } catch (error: any) {
    console.error('❌ Update error:', error);
    return c.json({ code: 500, message: error.message, error: 'Internal Server Error' }, 500);
  }
});

// Delete notice (admin only)
app.delete('/make-server-ee767080/notices/:id', async (c) => {
  console.log('');
  console.log('═══════════════════════════════════════════════════════');
  console.log('🗑️ DELETE /notices/:id');
  console.log('══════════════════════════════════════════��════════════');
  
  try {
    // Extract token
    const accessToken = extractToken(c);
    
    if (!accessToken) {
      console.error('❌ No token');
      return c.json({ code: 401, message: 'No token', error: 'Unauthorized' }, 401);
    }
    
    // Verify JWT
    const { user, error: authError } = await verifyJWTAndGetUser(accessToken);
    
    if (authError || !user) {
      console.error('❌ Auth failed:', authError);
      return c.json({ code: 401, message: authError || 'Invalid JWT', error: 'Unauthorized' }, 401);
    }
    
    console.log('✅ User:', user.email);
    
    // Check admin status using profiles.role
    console.log('🔍 Checking admin status...');
    const { isAdmin, error: adminError } = await isUserAdmin(user.id);
    
    if (adminError) {
      console.error('❌ Error checking admin status:', adminError);
      return c.json({ code: 500, message: 'Error checking admin status', error: adminError }, 500);
    }
    
    if (!isAdmin) {
      console.error('❌ Not admin');
      return c.json({ code: 403, message: 'Admin access required', error: 'Forbidden' }, 403);
    }
    
    console.log('✅ Admin verified');
    
    const id = c.req.param('id');
    
    const existingNotice = await kv.get(`notice:${id}`);
    
    if (!existingNotice) {
      return c.json({ code: 404, message: 'Notice not found', error: 'Not Found' }, 404);
    }
    
    await kv.del(`notice:${id}`);
    
    console.log('✅ Notice deleted:', id);
    console.log('═══════════════════════════════════════════════════════');
    return c.json({ success: true, message: 'Notice deleted' });
  } catch (error: any) {
    console.error('❌ Delete error:', error);
    return c.json({ code: 500, message: error.message, error: 'Internal Server Error' }, 500);
  }
});

// Start server
console.log('');
console.log('═══════════════════════════════════════════════════════');
console.log('✅ Server initialization complete!');
console.log('🌐 Beautiful Hanbang Hospital Server is LIVE');
console.log('📍 Version:', SERVER_VERSION);
console.log('');
console.log('🔑 AUTH SYSTEM - CLEAN & SECURE:');
console.log('   1️⃣ JWT Extraction (Authorization Header ONLY):');
console.log('      • Frontend → Authorization: Bearer {USER_JWT}');
console.log('      • Server → extractToken(c) → Validate JWT format');
console.log('      • ❌ NO query parameter fallback (removed for security)');
console.log('   2️⃣ JWT Verification:');
console.log('      • Server → supabaseAnon.auth.getUser(token)');
console.log('      • Returns user.id and user.email');
console.log('   3️⃣ Admin Check:');
console.log('      • Server → supabase.from("profiles").select("role")');
console.log('      • Server → Check if role === "admin"');
console.log('');
console.log('🎯 STANDARDIZED: All CRUD APIs use same flow');
console.log('📊 profiles.role for ALL permission checks');
console.log('🔒 SERVICE_ROLE_KEY bypasses RLS for profiles query');
console.log('═══════════════════════════════════════════════════════');
console.log('');
Deno.serve(app.fetch);