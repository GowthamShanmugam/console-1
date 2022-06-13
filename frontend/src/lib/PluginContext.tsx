/* Copyright Contributors to the Open Cluster Management project */
import { createContext } from 'react'

export type CommonType = {
    type?: string;
    properties?: any;
    flags?: Partial<{
        required: string[];
        disallowed: string[];
    }> | undefined;
}

export const PluginContext = createContext<{
    isACMAvailable?: boolean
    isOverviewAvailable?: boolean
    isSubmarinerAvailable?: boolean
    isApplicationsAvailable?: boolean
    isGovernanceAvailable?: boolean
    isSearchAvailable?: boolean
    applicationActionExtensions: CommonType[]
    
}>({
    isACMAvailable: true,
    isOverviewAvailable: true,
    isSubmarinerAvailable: true,
    isApplicationsAvailable: true,
    isGovernanceAvailable: true,
    isSearchAvailable: true,
    applicationActionExtensions: []
})
