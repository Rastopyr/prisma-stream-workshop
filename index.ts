import Joi from "@hapi/joi";
import { prisma } from "./generated/prisma/index";

const signUp = async ({ email }) => {
  const { error } = Joi.validate(
    email,
    Joi.string()
      .email()
      .required()
  );

  if (error) {
    throw new Error("Email expected");
  }

  const userIsExists = await prisma.$exists.user({
    email
  });

  if (userIsExists) {
    throw new Error(`User already exists in wishlist.app`);
  }

  return await prisma.createUser({
    email,
    role: "ADMIN"
  });
};

(async () => {
  const result = await signUp({ email: "seninr" });
})();
