'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {  ROOT_ROUTE, SESSION_COOKIE_NAME } from './constants';

export async function createSession(uid: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // One day
    path: '/',
  });

  redirect(ROOT_ROUTE);
}

export async function removeSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);

  redirect(ROOT_ROUTE);
}