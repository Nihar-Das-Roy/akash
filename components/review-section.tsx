"use client"

import { useState } from "react"
import { Star, Reply } from "lucide-react"
import type { Review } from "@/lib/data"
import { motion } from "framer-motion"

interface ReviewSectionProps {
  productId: string
  initialReviews: Review[]
  productRating: number
}

export default function ReviewSection({ productId, initialReviews, productRating }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [newReview, setNewReview] = useState({
    userName: "",
    rating: 5,
    text: "",
  })
  const [expandedReplies, setExpandedReplies] = useState<string[]>([])
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({})

  const handleSubmitReview = () => {
    if (!newReview.userName || !newReview.text) {
      alert("দয়া করে নাম এবং মন্তব্য পূরণ করুন")
      return
    }

    const review: Review = {
      id: `review-${Date.now()}`,
      productId,
      userName: newReview.userName,
      rating: newReview.rating,
      text: newReview.text,
      date: new Date().toISOString().split("T")[0],
      replies: [],
    }

    setReviews([review, ...reviews])
    setNewReview({ userName: "", rating: 5, text: "" })
  }

  const handleAddReply = (reviewId: string) => {
    if (!replyText[reviewId]) return

    const updatedReviews = reviews.map((review) => {
      if (review.id === reviewId) {
        return {
          ...review,
          replies: [
            ...review.replies,
            {
              id: `reply-${Date.now()}`,
              userName: "Captain Shop",
              text: replyText[reviewId],
              date: new Date().toISOString().split("T")[0],
            },
          ],
        }
      }
      return review
    })

    setReviews(updatedReviews)
    setReplyText({ ...replyText, [reviewId]: "" })
  }

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-lg border-2 border-blue-100">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-gray-600 mb-2">মোট রেটিং</p>
            <div className="flex items-center gap-3">
              <div className="text-4xl font-bold text-orange-500">{productRating.toFixed(1)}</div>
              <div>
                <div className="flex gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(productRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">{reviews.length} টি রিভিউ</p>
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter((r) => r.rating === rating).length
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
              return (
                <div key={rating} className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 w-8">{rating}⭐</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Add Review Form */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-bold mb-4 text-gray-900">আপনার মতামত লিখুন</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">আপনার নাম</label>
            <input
              type="text"
              value={newReview.userName}
              onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
              placeholder="নাম লিখুন"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">রেটিং</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setNewReview({ ...newReview, rating })}
                  className="text-3xl hover:scale-110 transition"
                >
                  <span className={newReview.rating >= rating ? "⭐" : "☆"}>
                    {newReview.rating >= rating ? "⭐" : "☆"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">মন্তব্য</label>
            <textarea
              value={newReview.text}
              onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
              placeholder="আপনার মতামত লিখুন..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>

          <button
            onClick={handleSubmitReview}
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
          >
            মতামত জমা দিন
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">গ্রাহক মতামত</h3>

        {reviews.length === 0 ? (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <p className="text-gray-600">এখনও কোনো মতামত নেই। প্রথম হন!</p>
          </div>
        ) : (
          reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              {/* Review Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-gray-900">{review.userName}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-4">{review.text}</p>

              {/* Replies */}
              {review.replies.length > 0 && (
                <div className="ml-4 mt-4 pt-4 border-l-2 border-orange-200">
                  {review.replies.map((reply, replyIndex) => (
                    <motion.div
                      key={reply.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: replyIndex * 0.1 }}
                      className="mb-3"
                    >
                      <div className="flex items-start gap-2">
                        <div className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {reply.userName}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">{reply.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{reply.date}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Reply Toggle */}
              <button
                onClick={() =>
                  setExpandedReplies(
                    expandedReplies.includes(review.id)
                      ? expandedReplies.filter((id) => id !== review.id)
                      : [...expandedReplies, review.id],
                  )
                }
                className="text-sm text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1 mt-3"
              >
                <Reply size={16} />
                {expandedReplies.includes(review.id) ? "লুকান" : "উত্তর দিন"}
              </button>

              {/* Reply Form */}
              {expandedReplies.includes(review.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pt-3 border-t flex gap-2"
                >
                  <input
                    type="text"
                    value={replyText[review.id] || ""}
                    onChange={(e) => setReplyText({ ...replyText, [review.id]: e.target.value })}
                    placeholder="উত্তর লিখুন..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-orange-500"
                  />
                  <button
                    onClick={() => handleAddReply(review.id)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition font-semibold"
                  >
                    পাঠান
                  </button>
                </motion.div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
