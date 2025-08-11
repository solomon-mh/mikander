import { getAllCompanions } from "@/lib/actions/companion.actions";
import CompanionCard from "@/components/CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import toast from "react-hot-toast";
import AddMoreCompanion from "@/components/AddMoreCompanion";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";

  const { data: companions, error } = await getAllCompanions({
    subject,
    topic,
  });
  if (error) {
    toast(`Failed to fetch sessions: ${error}`);
    return null;
  }
  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Companion Library</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className="companions-grid">
        {companions?.length ? (
          companions?.map((companion) => (
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))
        ) : (
          <p className="mt-24 mx-auto text-center text-lg text-gray-500 font-medium bg-gradient-to-r from-pink-700 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
            No Companions found for{" "}
            <span className="font-semibold">{topic || ""}</span>{" "}
            <span className="font-semibold">{subject || ""}</span>
          </p>
        )}
      </section>
      <AddMoreCompanion />
    </main>
  );
};

export default CompanionsLibrary;
