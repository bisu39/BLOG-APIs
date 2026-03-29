import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    content: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],

    category: {
      type: String,
      trim: true,
    },

    coverImage: {
      type: String, // URL of image
    },

    views: {
      type: Number,
      default: 0,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [{
      comment: {
        type: String,
        maxlength: 100
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    }],
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

export default mongoose.model("Post", postSchema);
