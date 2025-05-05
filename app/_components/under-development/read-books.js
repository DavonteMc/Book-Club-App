"use client";

import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function ReadBooks({ books }) {
  const [showUserReview, setShowUserReview] = useState(false);
  const [userReviewIndex, setUserReviewIndex] = useState(null);

  const handleUserReview = (index) => {
    if (
      showUserReview &&
      userReviewIndex !== null &&
      userReviewIndex !== index
    ) {
      setShowUserReview(false);
      setUserReviewIndex(index);
      setShowUserReview(true);
      return;
    }
    if (showUserReview && userReviewIndex === index) {
      setShowUserReview(false);
      setUserReviewIndex(null);
      return;
    }
    setShowUserReview(true);
    setUserReviewIndex(index);
  };

  return (
    <div className="mt-6 h-full w-full md:w-1/2 rounded-lg p-3 ">
      <div>
        <div className="flex flex-col space-y-4">
          {books.map((review, index) => (
            <div
              key={index}
              className="relative p-2 shadow-lg border border-neutral-900/30 shadow-neutral-900/10 rounded-xl"
            >
              <div className="flex justify-between items-start">
                <div>
                  {/* Desktop button */}
                  <button
                    className="hidden hover:text-neutral-900 md:flex items-center"
                    onClick={() => handleUserReview(index)}
                  >
                    <span className="underline underline-offset-4">
                      {review.title}
                    </span>
                    :
                    <span className="ml-2 text-emerald-800 font-semibold">
                      {" "}
                      {review.rating}
                    </span>
                    /10
                    {showUserReview && index === userReviewIndex ? (
                      <ChevronDown size={16} className="ml-1" />
                    ) : (
                      <ChevronRight size={16} className="ml-1" />
                    )}
                  </button>
                  {/* Mobile button */}
                  <button
                    className="md:hidden hover:text-neutral-900 flex items-center"
                    onClick={() => handleUserReview(index)}
                  >
                    <span className="w-5/5 text-wrap">{review.title}</span>
                  </button>
                </div>

                <span className="text-xs text-wrap w-1/5 text-emerald-900 whitespace-nowrap">
                  {review.date}
                </span>
              </div>
              {showUserReview && index === userReviewIndex && (
                <p className="flex-1 text-sm border-t pt-2 text-left border-emerald-950/30 mt-2">
                  {review.review}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
