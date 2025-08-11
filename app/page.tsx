import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import HeroSection from "@/components/Hero";
import {
  getAllCompanions,
  getRecentSessions,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";

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
      {userId ? (
        <>
          <h1>Popular Companions</h1>

          <section className="home-section">
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
        </>
      ) : (
        <HeroSection />
      )}
    </main>
  );
};

export default Page;
