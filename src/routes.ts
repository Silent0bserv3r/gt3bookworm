/**
 * An array of roytes that are accessible to public.
 * These routes do not require authentication
 */
export const publicRoutes: string[] = ['/'];

/**
 * An array of roytes that are used for user authentication.
 * These routes will redirect users to protected page
 */
export const authRoutes: string[] = [
	'/auth/login',
	'/auth/register',
	'/auth/error',
];

/**
 * The prefix for API authentication routes
 * Routes starting with this prefix are used for api authentication.
 */
export const apiAuthPrefix: string = '/api/auth';

/**
 * The default redirect path after authentication.
 */
export const DEFAULT_LOGIN_REDIRECT: string = '/settings';
