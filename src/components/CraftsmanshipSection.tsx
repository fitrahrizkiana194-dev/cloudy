import { CRAFT_DETAIL_IMAGE } from '../data/products';
import { ResilientImage } from './ResilientImage';

const CRAFT_PILLARS = [
  {
    num: '01.',
    title: 'Interior Fleece Krem Anti-Gores',
    desc: 'Bagian dalam berlapis beludru halus warna putih krem yang menjaga permukaan aluminium MacBook maupun tablet tetap mulus tanpa goresan halus.',
  },
  {
    num: '02.',
    title: 'Busa Memory Cloud 4-Lapis',
    desc: 'Konstruksi quilted puffy menyerap guncangan ringan saat tas diletakkan atau terbawa di dalam ransel harian yang padat.',
  },
  {
    num: '03.',
    title: 'Nylon Matte Tahan Percikan Air',
    desc: 'Permukaan luar bertekstur lembut namun menolak tumpahan kopi atau gerimis ringan sehingga aman untuk mobilitas kerja di kafe maupun kampus.',
  },
];

export function CraftsmanshipSection() {
  return (
    <section
      id="material"
      className="py-16 lg:py-20 bg-[#FDF6F8] border-t border-b border-[#F1DCE2]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Craftsmanship Image */}
          <div className="lg:col-span-6 flex">
            <div className="w-full rounded-2xl overflow-hidden border border-[#F1DCE2] bg-white aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px]">
              <ResilientImage
                src={CRAFT_DETAIL_IMAGE}
                alt="Detail lapisan dalam plush fleece putih krem dan jahitan quilted pink Cloudy Laptop Sleeve"
                fallbackTitle="Material Empuk 4-Lapis Cloudy"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Right Editorial Detail */}
          <div className="lg:col-span-6 flex flex-col justify-between py-1">
            <div>
              <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#C85175] mb-2">
                Material &amp; Detail
              </p>
              <h2
                className="font-display text-3xl sm:text-4xl font-semibold text-[#24191D] tracking-tight mb-6"
                style={{ textWrap: 'balance' }}
              >
                Dirancang manis tanpa mengorbankan proteksi.
              </h2>

              <div className="space-y-5">
                {CRAFT_PILLARS.map((item) => (
                  <div
                    key={item.num}
                    className="pb-5 border-b border-[#EFE0E5] last:border-b-0 last:pb-0"
                  >
                    <h3 className="text-base font-semibold text-[#24191D] mb-1">
                      <span className="text-[#C85175] mr-2 font-display">
                        {item.num}
                      </span>
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#725D64] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Adjacent Attributable Customer Proof */}
            <blockquote className="mt-8 pt-6 border-t border-[#E8D0D8]">
              <p className="text-sm text-[#24191D] italic leading-relaxed mb-2">
                &ldquo;Sebelumnya tas laptopku sering terasa berat dan kaku.
                Setelah pakai Cloudy Puffy Bow 14 inci dan Cloud Pouch-nya,
                laptop aman di dalam tote bag dan warnanya tetap bersih setelah 4
                bulan dipakai ke kantor setiap hari.&rdquo;
              </p>
              <footer className="text-xs text-[#725D64]">
                Nadia Pratiwi &middot; Product Designer, Studio Ruang Jakarta
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
