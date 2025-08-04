"use client"

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { store } from "./store/store";
import { Provider } from "react-redux";

type Props = {
   children: ReactNode;
}

const Providers = ({children}: Props) => {
   return (
   <SessionProvider> 
   <Provider store={store}> 
      {children} 
   </Provider>
   </SessionProvider>
   )
};

export default Providers;