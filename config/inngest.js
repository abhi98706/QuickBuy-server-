import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

export const inngest = new Inngest({ id: "quickbuy-next" });

export const syncUserCreation = inngest.createFunction(
  { event: "clerk/user.created" },
  { id: "sync-user-from-clerk" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    };
    await connectDB();
    await User.create(userData);
    return { success: true };
  }
);

export const syncUserUpdation = inngest.createFunction(
  { event: "clerk/user.updated" },
  { id: "update-user-from-clerk" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    const userData = {
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    };
    await connectDB();
    await User.findByIdAndUpdate(id, userData);
    return { updated: true };
  }
);

export const syncUserDeletion = inngest.createFunction(
  { event: "clerk/user.deleted" },
  { id: "delete-user-from-clerk" },
  async ({ event }) => {
    const { id } = event.data;
    await connectDB();
    await User.findByIdAndDelete(id);
    return { deleted: true };
  }
);
