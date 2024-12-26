export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  date: string;
  author: string;
  categories: string[];
  readTime: number;
  image: string;
  comments: Comment[];
}

import { Comment } from '@/types/blog';

export const posts: Post[] = [
  {
    id: "1",
    title: "Yapay Zeka ve Gelecek: İnsanlığı Neler Bekliyor?",
    slug: "yapay-zeka-ve-gelecek",
    content: `Yapay zeka teknolojisi, son yıllarda muazzam bir hızla gelişiyor ve hayatımızın her alanını derinden etkiliyor. Peki bu gelişmeler bizi nereye götürüyor? İnsanlığı nasıl bir gelecek bekliyor?

Yapay zekanın potansiyel etkileri üzerine düşünürken, hem olumlu hem de olumsuz senaryoları değerlendirmek önemli. Bir yandan hastalıkların teşhis ve tedavisinde devrim niteliğinde gelişmeler yaşanırken, diğer yandan istihdam ve sosyal eşitsizlik konularında endişeler artıyor.

Özellikle ChatGPT gibi büyük dil modellerinin ortaya çıkışı, yapay zekanın yaratıcı ve bilişsel görevlerdeki potansiyelini gözler önüne serdi. Bu gelişmeler, eğitimden sağlığa, iş dünyasından sanata kadar pek çok alanda köklü değişimlerin habercisi.

Ancak bu hızlı gelişim, beraberinde etik sorunları da getiriyor. Yapay zeka sistemlerinin kararlarındaki önyargılar, veri gizliliği ve güvenliği, hesap verebilirlik gibi konular, acilen çözüm bekleyen meseleler arasında.

Gelecekte yapay zeka ile uyumlu bir şekilde yaşayabilmek için, şimdiden gerekli düzenlemeleri yapmak ve etik çerçeveleri belirlemek büyük önem taşıyor. Bu süreçte, teknolojinin insanlığın yararına kullanılmasını sağlamak, hepimizin ortak sorumluluğu.`,
    summary: "Yapay zeka teknolojisinin gelişimi ve insanlığın geleceğine olası etkileri üzerine kapsamlı bir analiz.",
    date: "2024-01-15",
    author: "Admin",
    comments: [],
    categories: ["Teknoloji", "Bilim"],
    readTime: 5,
    image: "/images/ai-7977960_640.webp"
  },
  {
    id: "2",
    title: "Küresel Ekonomide Yeni Dengeler: Dijital Dönüşümün Etkileri",
    slug: "kuresel-ekonomide-yeni-dengeler",
    content: `Dünya ekonomisi, dijital dönüşümün etkisiyle hızlı bir değişim sürecinden geçiyor. Bu değişim, geleneksel iş modellerini kökten sarsarken, yeni fırsatlar ve zorluklar ortaya çıkarıyor.

Kripto paralar, blockchain teknolojisi ve dijital ödemeler, finansal sistemde devrim yaratıyor. Merkez bankalarının dijital para birimleri üzerinde çalışmaları, bu dönüşümün ne kadar ciddi olduğunu gösteriyor.

E-ticaretin yükselişi ve dijital platformların hakimiyeti, perakende sektöründen medyaya kadar pek çok alanı yeniden şekillendiriyor. Küçük işletmeler için hem fırsatlar hem de zorluklar barındıran bu süreç, adaptasyon yeteneğini kritik hale getiriyor.

Dijital dönüşüm, iş gücü piyasasını da derinden etkiliyor. Uzaktan çalışma modellerinin yaygınlaşması, yeni beceri setlerine olan talebi artırırken, bazı mesleklerin sonunu getiriyor.

Bu değişim sürecinde başarılı olmak için, hem bireylerin hem de kurumların sürekli öğrenme ve adaptasyon kabiliyetlerini geliştirmeleri gerekiyor. Dijital okuryazarlık ve teknoloji adaptasyonu, artık lüks değil, zorunluluk haline geldi.`,
    summary: "Dijital dönüşümün küresel ekonomi üzerindeki etkileri ve yeni ekonomik düzenin analizi.",
    date: "2024-01-10",
    author: "Admin",
    comments: [],
    categories: ["Ekonomi", "Teknoloji"],
    readTime: 4,
    image: "/images/bitcoin-6231930_640.jpg"
  },
  {
    id: "3",
    title: "Sürdürülebilir Yaşam: Bireysel Çabalar Fark Yaratabilir mi?",
    slug: "surdurulebilir-yasam",
    content: `İklim krizi ve çevre sorunları, günümüzün en acil çözüm bekleyen meseleleri arasında. Peki bireysel çabalarımız gerçekten bir fark yaratabilir mi?

Günlük alışkanlıklarımızı değiştirmek, sandığımızdan daha büyük bir etki yaratabilir. Plastik kullanımını azaltmak, enerji tasarrufu yapmak, geri dönüşüme önem vermek gibi basit adımlar, kolektif bir harekete dönüştüğünde güçlü sonuçlar doğurabilir.

Sürdürülebilir tüketim alışkanlıkları, sadece çevreyi korumakla kalmaz, aynı zamanda ekonomik açıdan da avantaj sağlar. Minimalist yaşam tarzı ve bilinçli tüketim, hem bütçemize hem de gezegenimize iyi gelir.

Yerel üretimi desteklemek, mevsiminde tüketmek, gıda israfını önlemek gibi tercihler, sürdürülebilir bir geleceğe katkı sağlar. Bu konuda bilinçli olmak ve çevremizi de bilinçlendirmek önemli.

Unutmayalım ki, büyük değişimler küçük adımlarla başlar. Her birimizin yapabileceği bir şeyler var ve bu çabalar, toplumsal bir dönüşüme öncülük edebilir.`,
    summary: "Sürdürülebilir yaşam için bireysel çabaların önemi ve günlük hayatta yapabileceklerimiz.",
    date: "2024-01-05",
    author: "Admin",
    comments: [],
    categories: ["Kültür", "Bilim"],
    readTime: 3,
    image: "/images/solar-4478105_640.jpg"
  },
  {
    id: "4",
    title: "Modern Sanat: Dijital Çağda Yaratıcılığın Evrimi",
    slug: "modern-sanat-dijital-cagda",
    content: `Sanat, dijital çağda yeni bir evrim geçiriyor. NFT'ler, dijital enstalasyonlar ve yapay zeka destekli sanat eserleri, sanat dünyasını kökten değiştiriyor.

Geleneksel sanat formları ile dijital teknolojilerin kesişimi, yeni ifade biçimlerinin doğmasına yol açıyor. Sanatçılar, teknolojinin sunduğu imkanları kullanarak sınırları zorluyor ve izleyiciyle etkileşimin yeni yollarını keşfediyor.

Özellikle NFT'lerin yükselişi, dijital sanatın değer kazanmasına ve sanatçıların eserlerini yeni platformlarda sergilemesine olanak sağlıyor. Bu gelişme, sanat piyasasının demokratikleşmesi açısından önemli fırsatlar sunuyor.

Yapay zeka teknolojilerinin sanatta kullanımı, yaratıcılık kavramını yeniden sorgulatıyor. İnsan ve makine işbirliğiyle ortaya çıkan eserler, sanatın geleceği hakkında heyecan verici olasılıklar sunuyor.

Modern sanatın bu yeni yüzü, geleneksel sanat kurumlarını ve galerileri de değişime zorluyor. Dijital platformlar ve sanal gerçeklik teknolojileri, sanat eserlerine erişimi demokratikleştirirken, yeni sergileme ve deneyimleme biçimleri ortaya çıkıyor.`,
    summary: "Dijital çağda sanatın geçirdiği dönüşüm ve modern sanatın yeni formları üzerine bir inceleme.",
    date: "2024-01-01",
    author: "Admin",
    comments: [],
    categories: ["Kültür", "Teknoloji"],
    readTime: 4,
    image: "/images/nft-7031679_640.webp"
  },
  {
    id: "5",
    title: "Siyasetin Dijital Dönüşümü: Sosyal Medya ve Demokrasi",
    slug: "siyasetin-dijital-donusumu",
    content: `Sosyal medya platformları, siyasi iletişim ve demokratik katılım biçimlerini derinden etkiliyor. Bu değişim, hem fırsatlar hem de tehditler barındırıyor.

Sosyal medya, bir yandan vatandaşların siyasi sürece katılımını kolaylaştırırken, diğer yandan dezenformasyon ve kutuplaşma risklerini artırıyor. Bu platformların demokratik süreçler üzerindeki etkisi, giderek daha fazla tartışma konusu oluyor.

Siyasi kampanyalar ve seçim süreçleri, dijital platformların etkisiyle büyük bir dönüşüm geçiriyor. Veri analizi ve hedefli reklamcılık, seçmen davranışlarını etkilemede kritik rol oynuyor.

Dijital aktivizm ve sosyal hareketler, sosyal medya sayesinde hızla organize olabiliyor ve küresel etki yaratabiliyor. Ancak bu durum, devletlerin dijital gözetim ve kontrol mekanizmalarını güçlendirmesine de yol açıyor.

Demokrasinin geleceği için, dijital okuryazarlık ve eleştirel düşünme becerilerinin geliştirilmesi büyük önem taşıyor. Sosyal medyanın demokratik süreçlere olumlu katkı sağlaması için, gerekli düzenlemelerin yapılması ve toplumsal bilincin artırılması gerekiyor.`,
    summary: "Sosyal medyanın siyaset ve demokrasi üzerindeki etkileri ve dijital çağda siyasi iletişimin dönüşümü.",
    date: "2023-12-28",
    author: "Admin",
    comments: [],
    categories: ["Politika", "Teknoloji"],
    readTime: 5,
    image: "/images/apps-426559_640.jpg"
  }
]; 