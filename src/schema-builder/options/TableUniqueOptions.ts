import { DeferrableType } from "../../metadata/types/DeferrableType";

/**
 * Database's table unique constraint options.
 */
export interface TableUniqueOptions {
    // -------------------------------------------------------------------------
    // Public Properties
    // -------------------------------------------------------------------------

    /**
     * Constraint name.
     */
    name?: string;

    /**
     * Columns that contains this constraint.
     */
    columnNames: string[];

    /**
     * DEFERRABLE type to be used to specify if foreign key constraints can be deferred.
     */
    deferrable?: DeferrableType;
}
