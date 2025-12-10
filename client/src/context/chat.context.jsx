/* eslint-disable react-refresh/only-export-components */
import { createContext } from "react"

export const ChatContext = createContext()

export function ChatProvider({children}) {

    return (
        <ChatContext.Provider>
            {children}
        </ChatContext.Provider>
    )
}