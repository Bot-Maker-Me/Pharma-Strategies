# Security Rules
- Never hardcode API keys, tokens, passwords
- Validate all inputs server-side
- Authenticate then authorize
- Prevent IDOR: always check resource ownership / tenant
- Use least privilege DB policies (RLS where applicable)
- Sanitize outputs; avoid leaking internal errors
- Secure cookies / sessions (httpOnly, secure, sameSite as appropriate)
- No dangerous eval / innerHTML with untrusted data
- Review auth, payments, file upload, and admin routes carefully
