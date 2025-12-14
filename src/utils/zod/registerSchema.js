import { z } from "zod";

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be at most 30 characters")
      .regex(
        /^[a-zA-Z0-9._-]+$/,
        "Username may contain letters, numbers, dot, underscore, dash"
      ),
    email: z
      .string()
      .trim()
      .pipe(z.email({ message: "Please provide a valid email address" })),
    full_name: z
      .string()
      .trim()
      .min(1, "Full name is required")
      .max(100, "Full name is too long"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one symbol")
      .refine((val) => val.toLowerCase() !== "password", {
        message: "Password cannot be 'password'",
      }),
  })
  .superRefine((data, ctx) => {
    const pwdRaw = String(data.password ?? "");
    const pwd = pwdRaw.trim();
    const pwdLower = pwd.toLowerCase();

    const uname = String(data.username ?? "").trim();
    const fname = String(data.full_name ?? "").trim();
    const mail = String(data.email ?? "").trim();

    // Equal-to checks (case-insensitive)
    for (const { value, label } of [
      { value: uname, label: "username" },
      { value: fname, label: "full name" },
      { value: mail, label: "email" },
    ]) {
      if (value && pwdLower === value.toLowerCase()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["password"],
          message: `Password cannot be the same as ${label}`,
        });
      }
    }

    // Contains checks (case-insensitive)
    // Username and email
    if (uname && uname.length >= 3 && pwdLower.includes(uname.toLowerCase())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password must not contain your username",
      });
    }
    if (mail && mail.length >= 3 && pwdLower.includes(mail.toLowerCase())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password must not contain your email",
      });
    }

    // Full name tokens and compact form
    if (fname) {
      const nameLower = fname.toLowerCase();
      const compactName = nameLower.replace(/[^a-z]/g, "");
      const tokens = nameLower
        .split(/\s+/)
        .map((t) => t.replace(/[^a-z]/g, ""))
        .filter((t) => t.length >= 3);

      if (
        (compactName.length >= 3 && pwdLower.includes(compactName)) ||
        tokens.some((t) => pwdLower.includes(t))
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["password"],
          message: "Password must not contain your name or any split part of it",
        });
      }
    }

    // Alphabetic prefix rule: block if the starting letters match name or tokens
    const alphaPrefixMatch = pwd.match(/^[A-Za-z]+/);
    const alphaPrefix = (alphaPrefixMatch?.[0] ?? "").toLowerCase();
    if (alphaPrefix && alphaPrefix.length >= 3 && fname) {
      const nameLower = fname.toLowerCase();
      const compactName = nameLower.replace(/[^a-z]/g, "");
      const tokens = nameLower
        .split(/\s+/)
        .map((t) => t.replace(/[^a-z]/g, ""))
        .filter((t) => t.length >= 3);

      const violatesPrefix =
        compactName.includes(alphaPrefix) ||
        tokens.some((t) => alphaPrefix.includes(t) || t.includes(alphaPrefix));

      if (violatesPrefix) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["password"],
          message:
            "Password must not start with your name or any split part of it",
        });
      }
    }
  });
