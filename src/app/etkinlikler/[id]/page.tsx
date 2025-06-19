import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventDetail from '@/components/EventDetail';

// This would typically come from an API or database
const getEventData = (id: string) => {
  // Mock data for demonstration
  const events = {
    '1': {
      id: '1',
      title: 'Kahve & Sohbet Buluşması',
      date: '15 Haziran 2024',
      time: '14:00 - 16:30',
      location: 'Brew Coffeeworks, Kadıköy',
      price: '75 ₺',
      category: 'Kahve',
      spotsLeft: 8,
      totalSpots: 15,
      description: 'Yeni insanlarla tanışmak ve keyifli sohbetler etmek için harika bir fırsat! Bu etkinliğimizde, Kadıköy\'ün en sevilen kahvecilerinden Brew Coffeeworks\'te buluşuyoruz. Özel kahve çeşitleri eşliğinde, farklı konularda sohbet edecek, yeni arkadaşlıklar kuracağız. Etkinlik moderatörümüz, herkesin kendini rahat hissedeceği bir ortam yaratacak ve sohbetin akıcı olmasını sağlayacak. Kahve tutkunları ve yeni insanlarla tanışmak isteyenler için ideal bir Cumartesi aktivitesi! Kontenjan sınırlı, yerinizi şimdiden ayırtın.',
      images: [
        '/images/event-coffee-1.jpg',
        '/images/event-coffee-2.jpg',
        '/images/event-coffee-3.jpg',
      ],
      host: {
        name: 'Ahmet Yılmaz',
        image: '/images/team-1.jpg',
        bio: 'Sosyal topluluklar ve etkinlik organizasyonu konusunda 5 yıllık deneyime sahip.',
      },
      includedItems: [
        'Özel filtre kahve veya espresso bazlı içecek',
        'Ev yapımı kurabiye ikramı',
        'Sohbet kartları aktivitesi',
        'Etkinlik sonrası WhatsApp grubu'
      ],
      requirements: [
        'Herhangi bir ön hazırlık gerekmiyor',
        'Pozitif enerji ve sohbet etmeye açık olmak yeterli'
      ],
      faq: [
        {
          question: 'Etkinliğe tek başıma katılabilir miyim?',
          answer: 'Kesinlikle! Katılımcılarımızın çoğu tek başına geliyor. Etkinlik başlangıcında tanışma aktivitesi yapıyoruz.'
        },
        {
          question: 'Etkinlik ücreti neyi kapsıyor?',
          answer: 'Etkinlik ücreti bir adet kahve, kurabiye ikramı ve etkinlik organizasyon bedelini kapsamaktadır.'
        },
        {
          question: 'Rezervasyon iptali yapabilir miyim?',
          answer: 'Etkinlikten 48 saat öncesine kadar iptal edebilirsiniz. Daha sonraki iptallerde ücret iadesi yapılmamaktadır.'
        }
      ]
    },
    '2': {
      id: '2',
      title: 'Karaoke Gecesi',
      date: '22 Haziran 2024',
      time: '20:00 - 23:30',
      location: 'Sing & Fun Karaoke Bar, Beşiktaş',
      price: '150 ₺',
      category: 'Müzik',
      spotsLeft: 4,
      totalSpots: 20,
      description: 'Şarkı söylemeyi seven veya sadece eğlenmek isteyen herkes için muhteşem bir gece! Beşiktaş\'ın en popüler karaoke mekanında özel bir oda kiraladık. İster grup halinde, ister solo performanslarla gecenin yıldızı olabilirsiniz. 5000\'den fazla şarkı seçeneği ve profesyonel ses sistemi ile unutulmaz bir deneyim yaşayacaksınız. Türkçe ve yabancı pop, rock, 90\'lar, 2000\'ler - her tarzda müzik mevcut! Çekingen olanlar merak etmesin, kimseyi zorlamıyoruz ama genellikle herkes cesaretini toplayıp en az bir şarkı söylüyor. Yeni arkadaşlıklar, bol kahkaha ve müzik dolu bir gece için hemen katılın!',
      images: [
        '/images/event-karaoke-1.jpg',
        '/images/event-karaoke-2.jpg',
        '/images/event-karaoke-3.jpg',
      ],
      host: {
        name: 'Elif Şahin',
        image: '/images/team-4.jpg',
        bio: 'Sosyal medya ve topluluk yönetimi konusunda uzman.',
      },
      includedItems: [
        'Özel karaoke odası kullanımı',
        'Bir adet içecek (alkollü veya alkolsüz)',
        'Atıştırmalık tabağı',
        'Profesyonel ses sistemi ve 5000+ şarkı seçeneği'
      ],
      requirements: [
        'Şarkı söyleme zorunluluğu yok, sadece izlemek de mümkün',
        '18 yaş ve üzeri katılımcılar için uygundur'
      ],
      faq: [
        {
          question: 'Şarkı söylemek zorunda mıyım?',
          answer: 'Hayır, kesinlikle zorunda değilsiniz. Sadece izleyici olarak katılabilir ve atmosferin tadını çıkarabilirsiniz.'
        },
        {
          question: 'Ne tür şarkılar mevcut?',
          answer: 'Türkçe ve yabancı pop, rock, 90\'lar, 2000\'ler dahil 5000\'den fazla şarkı seçeneği bulunmaktadır.'
        },
        {
          question: 'Ek içecek siparişi verebilir miyim?',
          answer: 'Evet, etkinlik ücretine bir içecek dahildir. Ek içecekler için mekanda ayrıca ödeme yapabilirsiniz.'
        }
      ]
    },
    '3': {
      id: '3',
      title: 'Bisiklet Turu: Adalar',
      date: '29 Haziran 2024',
      time: '09:00 - 17:00',
      location: 'Bostancı İskelesi, Kadıköy',
      price: '250 ₺',
      category: 'Spor',
      spotsLeft: 6,
      totalSpots: 12,
      description: 'İstanbul\'un gürültüsünden uzaklaşıp doğayla baş başa kalmak için harika bir fırsat! Büyükada\'da yapacağımız bu bisiklet turunda, adanın eşsiz manzaralarını keşfedecek, temiz havada spor yapmanın keyfini çıkaracağız. Bostancı İskelesi\'nde buluşup feribotla adaya geçeceğiz. Adada bisikletlerimizi kiralayıp, rehber eşliğinde yaklaşık 15 km\'lik keyifli bir rota izleyeceğiz. Tur sırasında tarihi köşkler, çam ormanları ve muhteşem deniz manzaraları eşliğinde molalar vereceğiz. Öğle yemeğimizi adanın meşhur restoranlarından birinde yiyeceğiz. Orta zorlukta bir rota olup, düzenli bisiklet kullanmayanlar için de uygundur. Doğa, spor ve yeni arkadaşlıklar için ideal bir hafta sonu aktivitesi!',
      images: [
        '/images/event-bike-1.jpg',
        '/images/event-bike-2.jpg',
        '/images/event-bike-3.jpg',
      ],
      host: {
        name: 'Burak Demir',
        image: '/images/team-3.jpg',
        bio: 'Sponsorluk anlaşmaları ve stratejik ortaklıklar konusunda deneyimli.',
      },
      includedItems: [
        'Vapur bileti (gidiş-dönüş)',
        'Bisiklet kiralama ücreti',
        'Profesyonel rehber eşliğinde tur',
        'Su ve atıştırmalık ikramları'
      ],
      requirements: [
        'Rahat kıyafet ve spor ayakkabı',
        'Şapka, güneş kremi ve güneş gözlüğü',
        'Temel bisiklet kullanma becerisi (profesyonel seviye gerekmiyor)'
      ],
      faq: [
        {
          question: 'Daha önce hiç bisiklet kullanmadım, katılabilir miyim?',
          answer: 'Temel bisiklet kullanma becerisine sahip olmanız yeterli. Çok dik yokuşlar olmayan bir rota seçiyoruz.'
        },
        {
          question: 'Kendi bisikletimi getirebilir miyim?',
          answer: 'Evet, ancak vapurda ekstra ücret ödemeniz gerekebilir. Etkinlik ücretine ada içinde bisiklet kiralama dahildir.'
        },
        {
          question: 'Yağmur yağarsa ne olacak?',
          answer: 'Hava durumu elverişsiz olduğunda etkinlik bir sonraki uygun tarihe ertelenecek veya ücret iadesi yapılacaktır.'
        }
      ]
    }
  };

  return events[id as keyof typeof events] || null;
};

export function generateMetadata({ params }: { params: { id: string } }) {
  const event = getEventData(params.id);
  
  if (!event) {
    return {
      title: 'Etkinlik Bulunamadı | Anlık Plan',
      description: 'Aradığınız etkinlik bulunamadı.'
    };
  }

  return {
    title: `${event.title} | Anlık Plan`,
    description: event.description.substring(0, 160) + '...',
  };
}

export default function EventPage({ params }: { params: { id: string } }) {
  const event = getEventData(params.id);

  if (!event) {
    return (
      <>
        <Navbar />
        <main className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Etkinlik Bulunamadı</h1>
            <p className="text-gray-600 mb-6">Aradığınız etkinlik bulunamadı veya kaldırılmış olabilir.</p>
            <a href="/etkinlikler" className="btn-primary">Tüm Etkinliklere Dön</a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <EventDetail {...event} />
      </main>
      <Footer />
    </>
  );
}
