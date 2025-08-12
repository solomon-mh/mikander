import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import HeroSection from "@/components/Hero";
import {
  getAllCompanions,
  getRecentSessions,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import AddMoreCompanion from "@/components/AddMoreCompanion";
import AuthRedirect from "@/components/AuthRedirect";

const Page = async () => {
  const { userId } = await auth();
  const { data: companions, error: getAllCompanyError } =
    await getAllCompanions({
      limit: 3,
    });
  const { data: recentSessionsCompanions, error } = await getRecentSessions(10);
  if (error) {
    console.log(`Failed to fetch sessions: ${error}`);
    return null;
  }
  if (getAllCompanyError) {
    console.log(`Failed to fetch sessions: ${getAllCompanyError}`);
    return null;
  }

  return (
    <main>
      <AuthRedirect />
      {userId ? (
        <>
          {companions && companions?.length > 0 ? (
            <>
              <h1>Popular Companions</h1>

              <section className="flex gap-8">
                {companions?.map((companion) => (
                  <CompanionCard
                    key={companion.id}
                    {...companion}
                    color={getSubjectColor(companion.subject)}
                  />
                ))}
              </section>

              <section className="home-section">
                <CompanionsList
                  title="Recently completed sessions"
                  companions={recentSessionsCompanions ?? []}
                  classNames="w-2/3 max-lg:w-full"
                />
              </section>
              <AddMoreCompanion />
            </>
          ) : (
            <div>
              <div className="pt-4 mb-12">
                <Link href="/companions/new">
                  <button className="relative group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-600 rounded-lg font-medium hover:bg-gray-600 text-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
                    <span className="relative z-10 flex items-center">
                      <Image
                        src="/icons/plus.svg"
                        alt="plus"
                        width={16}
                        height={16}
                        className="mr-2"
                      />
                      Build a New Companion
                    </span>
                    <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-gray-600 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                </Link>
              </div>
            </div>
          )}
        </>
      ) : (
        <HeroSection />
      )}
    </main>
  );
};

export default Page;
