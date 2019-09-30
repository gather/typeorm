import {IndexMetadata} from "../../metadata/IndexMetadata";
import {TableIndexOptions} from "../options/TableIndexOptions";

/**
 * Database's table index stored in this class.
 */
export class TableIndex {

    // -------------------------------------------------------------------------
    // Public Properties
    // -------------------------------------------------------------------------

    /**
     * Index name.
     */
    name?: string;

    /**
     * Columns included in this index.
     */
    columnNames: string[] = [];

    /**
     * Indicates if this index is unique.
     */
    isUnique: boolean;

    /**
     * The SPATIAL modifier indexes the entire column and does not allow indexed columns to contain NULL values.
     * Works only in MySQL.
     */
    isSpatial: boolean;

    /**
     * The PG_TEXT_SEARCH_INDEX modifier creates an index to improve the performance of full text searches.
     * Works only in PostgreSQL.
     * https://www.postgresql.org/docs/10/textsearch-indexes.html
     */
    pgTextSearchIndex?: {
        indexType: "GIN" | "GIST";
        operator?: string;
    };

    /**
     * The FULLTEXT modifier indexes the entire column and does not allow prefixing.
     * Works only in MySQL.
     */
    isFulltext: boolean;

    /**
     * Index filter condition.
     */
    where: string;

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(options: TableIndexOptions) {
        this.name = options.name;
        this.columnNames = options.columnNames;
        this.isUnique = !!options.isUnique;
        this.isSpatial = !!options.isSpatial;
        this.isFulltext = !!options.isFulltext;
        this.where = options.where ? options.where : "";
        this.pgTextSearchIndex = options.pgTextSearchIndex;
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    /**
     * Creates a new copy of this index with exactly same properties.
     */
    clone(): TableIndex {
        return new TableIndex(<TableIndexOptions>{
            name: this.name,
            columnNames: [...this.columnNames],
            isUnique: this.isUnique,
            isSpatial: this.isSpatial,
            isFulltext: this.isFulltext,
            where: this.where,
            pgTextSearchIndex: this.pgTextSearchIndex
        });
    }

    // -------------------------------------------------------------------------
    // Static Methods
    // -------------------------------------------------------------------------

    /**
     * Creates index from the index metadata object.
     */
    static create(indexMetadata: IndexMetadata): TableIndex {
        return new TableIndex(<TableIndexOptions>{
            name: indexMetadata.name,
            columnNames: indexMetadata.columns.map(column => column.databaseName),
            isUnique: indexMetadata.isUnique,
            isSpatial: indexMetadata.isSpatial,
            isFulltext: indexMetadata.isFulltext,
            where: indexMetadata.where,
            pgTextSearchIndex: indexMetadata.pgTextSearchIndex
        });
    }

}
