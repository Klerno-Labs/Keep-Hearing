export type CausePromoProps = {
  percent: number;
  basis: "revenue" | "gross" | "net";
  sponsor: string;
  beneficiary: string;
  dateRange?: string;
  region?: string;
  capsFloors?: string;
  utm?: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  enabled: boolean;
  label?: string;
};

export function CausePromo(p: CausePromoProps) {
  if (!p.enabled) return null;
  return (
    <aside
      className="rounded-2xl border p-5 md:p-6 bg-card"
  style={{ backgroundImage: "url('/images/lab-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}
    >
      <div className="text-xs uppercase tracking-wide opacity-70 mb-2">
        {p.label ?? "Promo / Partner Offer"}
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.imageSrc} alt={p.imageAlt} className="w-40 h-40 object-cover rounded-xl" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Shop SoundBites</h3>
          <p>
            <strong>{p.percent}%</strong> of {p.basis} from qualifying purchases is donated to{" "}
            <strong>{p.beneficiary}</strong>{p.dateRange ? ` during ${p.dateRange}` : ""}.
          </p>
          <p className="text-sm opacity-80">
            Sponsor: {p.sponsor}. Beneficiary: {p.beneficiary}.
            {p.region ? ` Territory: ${p.region}.` : ""} {p.capsFloors ? ` Limits: ${p.capsFloors}.` : ""}
            {" "}Purchases are <strong>not tax-deductible</strong> as donations.
          </p>
          <a
            className="inline-flex items-center rounded-lg border px-4 py-2 hover:bg-brand.accent/10"
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit SoundBites
          </a>
        </div>
      </div>
    </aside>
  );
}
