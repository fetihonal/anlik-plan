"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  order_index: number;
  created_at: string;
  updated_at: string;
};

const AboutSection = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const { data, error } = await supabase
          .from("team_members")
          .select("*")
          .order("order_index", { ascending: true });
          
        if (error) {
          console.error("Error fetching team members:", error);
          return;
        }
        
        setTeamMembers(data || []);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeamMembers();
  }, [supabase]);
  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Our Story */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Hikayemiz</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                Anlık Plan, 2023 yılında şehir hayatında yeni insanlarla
                tanışmanın zorluğunu yaşayan bir grup arkadaş tarafından
                kuruldu. Geleneksel sosyalleşme yöntemlerinin dışında, eğlenceli
                ve yaratıcı bir topluluk oluşturma fikriyle yola çıktık.
              </p>
              <p>
                İlk etkinliğimizi sadece 15 kişiyle gerçekleştirdik. Bugün ise
                aylık 20'den fazla etkinlik düzenliyor ve 5000'den fazla üyeye
                sahip bir topluluk olarak büyümeye devam ediyoruz.
              </p>
              <p>
                Misyonumuz, şehir hayatında yalnızlaşan bireylere samimi bir
                ortamda yeni arkadaşlıklar kurabilecekleri, eğlenceli ve
                yaratıcı etkinlikler sunmak. Vizyonumuz ise Türkiye'nin en büyük
                sosyal etkinlik topluluğu olmak.
              </p>
            </div>
          </div>

          {/* Values */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Değerlerimiz</h3>
            <div className="space-y-6">
              <div className="flex">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Kapsayıcılık</h4>
                  <p className="text-gray-600">
                    Herkesin kendini rahat ve güvende hissedeceği bir ortam
                    yaratmak.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Eğlence</h4>
                  <p className="text-gray-600">
                    Her etkinliğimizde eğlenceyi ve pozitif enerjiyi ön planda
                    tutmak.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Yaratıcılık</h4>
                  <p className="text-gray-600">
                    Sıradanlığın dışına çıkan, özgün ve yaratıcı etkinlik
                    formatları geliştirmek.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Samimiyet</h4>
                  <p className="text-gray-600">
                    Gerçek bağlantılar kurmayı teşvik eden samimi bir ortam
                    yaratmak.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">Ekibimiz</h3>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : teamMembers.length === 0 ? (
            <p className="text-center text-gray-500">Henüz ekip üyesi eklenmemiş.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-light rounded-2xl overflow-hidden text-center">
                  <div className="relative h-64 w-full">
                    <Image
                      src={member.image.startsWith("/") ? member.image : `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/team-images/${member.image}`}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-xl mb-1">{member.name}</h4>
                    <p className="text-primary mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
