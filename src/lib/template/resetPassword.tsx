import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Preview,
	Section,
	Text,
} from '@react-email/components';
import React from 'react';

const PasswordResetTemplate = (confirmLink: string) => {
	return (
		<Html>
			<Head />
			<Preview>Reset Your Password: Bookworm</Preview>
			<Body style={main}>
				<Container style={container}>
					<Section style={box}>
						<Img
							src={
								'https://raw.githubusercontent.com/Silent0bserv3r/bookworm/main/public/bookworm.png'
							}
							width="40"
							height="40"
							alt="BookWorm"
						/>
						<Heading as="h2" ml={'2px'}>
							BookWorm
						</Heading>
						<Text style={paragraph}>
							We got a request to reset your account password.
							Click on the link below to continue with password
							reset.
						</Text>
						<Button style={button} href={confirmLink}>
							Verify your email
						</Button>
						<Hr style={hr} />
						<Text style={paragraph}>
							If not requested by you we recommend deleting this
							email and reporting this to our customer support.
							This link will expire in 15 mins.
						</Text>
						<Text style={paragraph}>— The Bookworm team</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

export default PasswordResetTemplate;

const main = {
	backgroundColor: '#f6f9fc',
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
	backgroundColor: '#ffffff',
	margin: '0 auto',
	padding: '20px 0 48px',
	marginBottom: '64px',
};

const box = {
	padding: '0 48px',
};

const hr = {
	borderColor: '#e6ebf1',
	margin: '20px 0',
};

const paragraph = {
	color: '#525f7f',
	fontSize: '16px',
	lineHeight: '24px',
	textAlign: 'left' as const,
};

const logo = {
	display: 'flex' as const,
	flexDirection: 'column' as const,
	alignItems: 'center' as const,
	justifyItems: 'center' as const,
};

const button = {
	backgroundColor: '#656ee8',
	borderRadius: '5px',
	color: '#fff',
	fontSize: '16px',
	fontWeight: 'bold',
	textDecoration: 'none',
	textAlign: 'center' as const,
	display: 'block',
	width: '100%',
	padding: '10px',
};
