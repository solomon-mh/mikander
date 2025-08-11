"use client";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AddMoreCompanion = () => {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddMoreCompanion = async () => {
    const canCreateCompanion = await newCompanionPermissions();
    if (canCreateCompanion) {
      router.push("/companions/new");
    } else {
      setIsModalVisible(true);
    }
  };

  return (
    <div>
      <div className="pt-4 mb-12">
        <button
          onClick={handleAddMoreCompanion}
          className="relative group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-600 rounded-lg font-medium hover:bg-gray-600 text-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
        >
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
      </div>

      {/* Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-200 rounded-xl p-6 w-full max-w-md shadow-2xl relative animate-fadeIn">
            {/* Close button */}
            <button
              onClick={() => setIsModalVisible(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            {/* Badge */}
            <div className="inline-block px-3 py-1 bg-gradient-to-r from-gray-400 to-pink-500 rounded-full text-sm font-semibold text-white mb-4">
              Upgrade your plan
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-500 mb-2">
              You’ve Reached Your Limit
            </h1>

            {/* Description */}
            <p className="text-gray-500 mb-6">
              You’ve reached your companion limit. Upgrade to create more
              companions and access premium features.
            </p>

            {/* CTA */}
            <Link
              href="/subscription"
              className="block text-center px-4 py-3 bg-gradient-to-r from-gray-400 to-pink-500 text-gray-200 rounded-lg font-medium hover:opacity-90 transition"
            >
              Upgrade My Plan
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMoreCompanion;
