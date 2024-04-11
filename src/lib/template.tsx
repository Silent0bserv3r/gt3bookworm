export const verificationTemplate = (link: string) => `
    <body>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 50px auto;
                background-color: #ffffff;
                border-radius: 10px;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333333;
                text-align: center;
            }
            p {
                color: #666666;
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 20px;
            }
            .btn {
                display: inline-block;
                padding: 10px 20px;
                background-color: #4caf50;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                transition: background-color 0.3s;
            }
            .btn:hover {
                background-color: #45a049;
            }
        </style>
        <div class="container">
            <h1>Email Verification</h1>
            <p>
                Thank you for signing up! To complete your registration, please
                click the button below to verify your email address.
            </p>
            <a href=${link} class="btn">Verify Email</a>
            <p>
                If you did not sign up for an account, you can safely ignore this
                email.
            </p>
        </div>
    </body>
`;

export const resetTemplate = (link: string) => (
	<div className="m-0 bg-[#f4f4f4] p-0 font-sans">
		<div className="mx-auto my-[50px] max-w-[600px] rounded-xl bg-white p-[20px] shadow-md">
			<h1 className="text-center text-[#333333]">Email Verification</h1>
			<p className="mb-5 text-xl leading-relaxed text-[#666666]">
				You have requested to reset your password! To confirm, please
				click the button below to continue.
			</p>
			<a
				href={link}
				className="inline-block rounded-lg bg-[#4caf50] px-5 py-3 text-white transition-colors hover:bg-[#45a049]"
			>
				Reset Password
			</a>
			<p className="mb-5 text-xl leading-relaxed text-[#666666]">
				If you did not sign up for an account, we recommend you change
				you password as soon as possible.
			</p>
		</div>
	</div>
);
