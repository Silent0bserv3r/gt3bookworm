'use client';

import { handleLogOut } from '@/actions/login';
import React from 'react';

import { Button } from '../ui/button';

export const LogoutButton = () => {
	return <Button onClick={() => handleLogOut()}>Sign Out</Button>;
};
