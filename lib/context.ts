import { Model } from "@/hooks/models";
import { createContext } from "react";

export type Responses = Record<Model, string>;
export type Prompts = Record<Model, string> & Record<"all", string>;

interface AppContextType {
  responses: Responses;
  prompts: Prompts;
  handleSubmit: (formData: FormData, model: Model) => void;
}

export const AppContext = createContext<AppContextType>({
  responses: { ganem: "", castor: "", joberg: "" },
  prompts: { ganem: "", castor: "", joberg: "", all: "" },
  handleSubmit: () => null,
});
