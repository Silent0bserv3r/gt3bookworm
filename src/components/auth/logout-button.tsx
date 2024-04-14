'use client';

import { signOut } from 'next-auth/react';
import React from 'react';

import { Button } from '../ui/button';

export const LogoutButton = () => {
	return <Button onClick={() => signOut()}>Sign Out</Button>;
};
