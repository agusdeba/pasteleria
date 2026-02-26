import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // 1. Creamos la respuesta base
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 2. Inicializamos Supabase con la nueva sintaxis getAll y setAll
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      },
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Actualizamos las cookies en la request (para que Supabase las lea ahora)
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          
          // Refrescamos la respuesta de Next.js
          response = NextResponse.next({
            request,
          });
          
          // Aplicamos las cookies en la respuesta (para que se guarden en el navegador)
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 3. Verificamos la sesión
  const { data: { user } } = await supabase.auth.getUser();

  // 4. Protegemos la ruta
  if (!user && request.nextUrl.pathname.startsWith('/admin')) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/login'; 
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};