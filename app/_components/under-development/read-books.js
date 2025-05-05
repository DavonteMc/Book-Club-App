"use client";

import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function ReadBooks({ books }) {
  const [showUserReview, setShowUserReview] = useState(false);
  const [userReviewIndex, setUserReviewIndex] = useState(null);
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [remove, setRemove] = useState(false);
  const [removeIndex, setRemoveIndex] = useState(null);

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

  const handleEdit = (index) => {
    if (edit && editIndex !== null && editIndex !== index) {
      setEdit(false);
      setEditIndex(index);
      setEdit(true);
      return;
    }
    if (edit && editIndex === index) {
      setEdit(false);
      setEditIndex(null);
      return;
    }
    setEdit(true);
    setEditIndex(index);
  };

  const handleRemove = (index) => {
    if (remove && removeIndex !== null && removeIndex !== index) {
      setRemove(false);
      setRemoveIndex(index);
      setRemove(true);
      return;
    }
    if (remove && removeIndex === index) {
      setRemove(false);
      setRemoveIndex(null);
      return;
    }
    setRemove(true);
    setRemoveIndex(index);
  };

  return (
    <div className="mt-6 h-full w-full md:w-1/2 rounded-lg p-3 ">
      <div>
        <div className="flex flex-col space-y-4">
          {books.map((review, index) => (
            <button
              key={index}
              className="relative p-2 shadow-lg border border-neutral-900/30 shadow-neutral-900/10 rounded-xl"
              onClick={() => handleUserReview(index)}
            >
              <div className="flex justify-between items-start">
                <div>
                  {/* Desktop button */}
                  <div className="hidden hover:text-neutral-900 text-xl md:flex items-center">
                    <span className="underline underline-offset-4 font-semibold">
                      {review.title}
                    </span>
                    :
                    <span className="ml-2 text-emerald-800 font-bold">
                      {" "}
                      {review.rating}
                    </span>
                    /10
                    {showUserReview && index === userReviewIndex ? (
                      <ChevronDown size={18} className="ml-1" />
                    ) : (
                      <ChevronRight size={18} className="ml-1" />
                    )}
                  </div>
                  {/* Mobile button */}
                  <div className="md:hidden hover:text-neutral-900 flex items-center">
                    <span className="w-5/5 text-wrap">{review.title}</span>
                  </div>
                </div>

                <span className="text-xs text-wrap w-1/5 text-emerald-900 whitespace-nowrap">
                  {review.date}
                </span>
              </div>
              {showUserReview && index === userReviewIndex && (
                <div className="flex-1 text-sm border-t border-emerald-950/30 mt-2">
                  <div>
                    <button>Edit</button>
                    {edit && index === editIndex && (
                      <p>Editable</p>
                    )}
                    <button>Remove</button>
                    {remove && index === removeIndex && (
                      <p>Removable</p>
                    )}
                  </div>
                  <p className="text-sm pt-2 pb-2 text-left mt-2">
                    {review.review}
                  </p>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
