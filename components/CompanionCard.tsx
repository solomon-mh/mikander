"use client";
import {
  getBookmarkedCompanions,
  removeBookmark,
} from "@/lib/actions/companion.actions";
import { addBookmark } from "@/lib/actions/companion.actions";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
}: CompanionCardProps) => {
  const { user } = useUser();

  const [bookmarked, setBookMarked] = useState(false);
  useEffect(() => {
    async function fetchBookMarks() {
      if (!user) return;
      const rawBookMarks: Array<{ id: string }>[] =
        await getBookmarkedCompanions(user?.id);
      // Flatten and map to objects with id property
      const bookMarks: { id: string }[] = rawBookMarks
        .flat()
        .map((bkm) => ({ id: bkm.id }));
      const isBookmarked = bookMarks.some((bkm) => id === bkm.id);
      setBookMarked(isBookmarked);
    }
    fetchBookMarks();
  });
  const pathname = usePathname();
  const handleBookmark = async () => {
    if (bookmarked) {
      await removeBookmark(id, pathname);
      setBookMarked(false);
    } else {
      setBookMarked(true);
      await addBookmark(id, pathname);
    }
  };
  return (
    <article className="companion-card" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark" onClick={handleBookmark}>
          <Image
            src={
              bookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"
            }
            alt="bookmark"
            width={12.5}
            height={15}
          />
        </button>
      </div>
      <h2 className="text-2xl font-bold dark:text-gray-600">{name}</h2>
      <p className="text-sm dark:text-gray-600">{topic}</p>
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-400">
        <Image
          src="/icons/clock.svg"
          alt="duration"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm">{duration} minutes</p>
      </div>
      <Link href={`/companions/${id}`} className="w-full">
        <button className="btn-primary w-full justify-center">
          Launch Lesson
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;
