import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // 1. Creamos una respuesta base que el middleware podrá modificar
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 2. Inicializamos el cliente de Supabase configurado para leer y escribir cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  // 3. Verificamos de forma segura si el usuario está autenticado
  const { data: { user } } = await supabase.auth.getUser();

  // 4. Lógica de protección: 
  // Si NO hay usuario y la ruta visitada empieza con "/admin"...
  if (!user && request.nextUrl.pathname.startsWith('/admin')) {
    // Clonamos la URL actual y lo redirigimos a la página de login
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/login'; // Ajustá esto al nombre exacto de tu ruta de login
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Protege todas las rutas que empiecen con /admin.
     */
    '/admin/:path*',
  ],
};