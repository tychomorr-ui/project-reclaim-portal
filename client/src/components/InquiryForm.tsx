import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

type FormKind = "contact" | "partnership";
const initialFields = { name: "", email: "", organization: "", phone: "", focus: "", message: "" };

export function InquiryForm({ type, title }: { type: FormKind; title: string }) {
  const [fields, setFields] = useState(initialFields);
  const submit = trpc.inquiries.create.useMutation({
    onSuccess: () => { toast.success("Thank you. Your message has been received."); setFields(initialFields); },
    onError: (error) => toast.error(error.message || "We could not send your message. Please try again."),
  });
  const update = (field: keyof typeof fields, value: string) => setFields((current) => ({ ...current, [field]: value }));
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); submit.mutate({ type, ...fields, organization: fields.organization || undefined, phone: fields.phone || undefined, focus: fields.focus || undefined }); };

  return <form onSubmit={handleSubmit} className="paper-card rounded-2xl border border-[#d8d3c2] bg-[#fffdf7] p-5 sm:p-7"><div className="mb-7"><p className="mono-label text-[10px] text-[#597248]">Secure inquiry</p><h2 className="display-type mt-3 text-3xl font-semibold text-[#203023]">{title}</h2></div><div className="grid gap-5 sm:grid-cols-2"><div className="grid gap-2"><Label htmlFor={`${type}-name`}>Name</Label><Input id={`${type}-name`} value={fields.name} onChange={(event) => update("name", event.target.value)} required /></div><div className="grid gap-2"><Label htmlFor={`${type}-email`}>Email</Label><Input id={`${type}-email`} type="email" value={fields.email} onChange={(event) => update("email", event.target.value)} required /></div><div className="grid gap-2"><Label htmlFor={`${type}-organization`}>{type === "partnership" ? "Organization" : "Organization, if applicable"}</Label><Input id={`${type}-organization`} value={fields.organization} onChange={(event) => update("organization", event.target.value)} /></div><div className="grid gap-2"><Label htmlFor={`${type}-focus`}>{type === "partnership" ? "Partnership focus" : "How would you like to help?"}</Label><Input id={`${type}-focus`} value={fields.focus} onChange={(event) => update("focus", event.target.value)} /></div></div><div className="mt-5 grid gap-2"><Label htmlFor={`${type}-message`}>Message</Label><Textarea id={`${type}-message`} value={fields.message} onChange={(event) => update("message", event.target.value)} minLength={12} required className="min-h-32 resize-y" /></div><p className="mt-4 text-xs leading-5 text-[#687166]">By sending this inquiry, you consent to Project Reclaim retaining it for follow-up. Please do not include sensitive personal, medical, or financial information.</p><Button type="submit" disabled={submit.isPending} className="mt-6 rounded-full bg-[#294b2c] px-5 text-white hover:bg-[#1e3921]">{submit.isPending ? <><Loader2 className="mr-2 size-4 animate-spin" />Sending</> : "Send inquiry"}</Button></form>;
}
