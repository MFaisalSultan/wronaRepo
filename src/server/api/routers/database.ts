import { collection, addDoc, getDocs, query, where } from "@firebase/firestore";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { z } from "zod";

async function checkDuplicateEmail({
  collectionName,
  email,
}: {
  collectionName: string;
  email: string;
}) {
  const q = query(collection(db, collectionName), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  return querySnapshot.size > 0;
}

export const databaseRouter = createTRPCRouter({
  addMessage: publicProcedure
    .input(
      z.object({ name: z.string(), email: z.string(), message: z.string() })
    )
    .mutation(async ({ input }) => {
      try {
        /* Check if duplicate with the same email */
        const isDuplicate = await checkDuplicateEmail({
          collectionName: "messages",
          email: input.email,
        });

        if (isDuplicate) {
          return "Error adding document: Duplicate email";
        } else {
          const docRef = await addDoc(collection(db, "messages"), {
            name: input.name,
            email: input.email,
            message: input.message,
          });

          return docRef.id;
        }
      } catch (e) {
        return e;
      }
    }),

  addSubscription: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ input }) => {
      try {
        /* Check if duplicate with the same email */
        const isDuplicate = await checkDuplicateEmail({
          collectionName: "subscriptions",
          email: input.email,
        });

        if (isDuplicate) {
          return "Error adding document: Duplicate email";
        } else {
          const docRef = await addDoc(collection(db, "subscriptions"), {
            email: input.email,
          });

          return docRef.id;
        }
      } catch (e) {
        return e;
      }
    }),

  addPreorder: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        quantity: z.number(),
        deliveryAddress: z.string(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        /* Check if duplicate with the same email */
        const isDuplicate = await checkDuplicateEmail({
          collectionName: "preorders",
          email: input.email,
        });

        if (isDuplicate) {
          return "Error adding document: Duplicate email";
        } else {
          const docRef = await addDoc(collection(db, "preorders"), {
            name: input.name,
            email: input.email,
            quantity: input.quantity,
            deliveryAddress: input.deliveryAddress,
            message: input.message,
          });

          return docRef.id;
        }
      } catch (e) {
        return e;
      }
    }),
});
