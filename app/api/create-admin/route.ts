import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const { email, role } = await request.json();
    console.log('Creating admin:', email, role);

    // Initialize Supabase with SERVICE ROLE KEY (this is crucial!)
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Step 1: Create the user in Supabase Auth
    console.log('Creating auth user...');
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: 'admin@2026',
      email_confirm: true,
    });

    if (authError) {
      console.error('Auth error:', authError);
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json({ error: 'No user created' }, { status: 400 });
    }

    console.log('Auth user created, ID:', authData.user.id);

    // Step 2: Insert into admins table
    console.log('Inserting into admins table...');
    const { error: dbError } = await supabaseAdmin
      .from('admins')
      .insert({
        id: authData.user.id,
        email,
        role,
        username: email.split('@')[0],
      });

    if (dbError) {
      console.error('DB error:', dbError);
      // Clean up: delete the auth user if DB insert fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json({ error: dbError.message }, { status: 400 });
    }

    console.log('Admin created successfully!');
    return NextResponse.json({ success: true });
    
  } catch (err: any) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
