import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AddMoreCompanion = async () => {
  const canCreateCompanion = await newCompanionPermissions();
  return (
    <div>
      {canCreateCompanion ? (
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
                Add More Companion
              </span>
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-gray-600 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </Link>
        </div>
      ) : (
        <article className="space-y-4 mb-10">
          <div className="cta-badge">Upgrade your plan</div>
          <h1>You’ve Reached Your Limit</h1>
          <p>
            You’ve reached your companion limit. Upgrade to create more
            companions and premium features.
          </p>
          <Link
            href="/subscription"
            className="btn-primary w-full justify-center"
          >
            Upgrade My Plan
          </Link>
        </article>
      )}
    </div>
  );
};

export default AddMoreCompanion;
