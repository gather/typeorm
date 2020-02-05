import { getMetadataArgsStorage } from "../index";
import { UniqueMetadataArgs } from "../metadata-args/UniqueMetadataArgs";
import { DeferrableType } from "../metadata/types/DeferrableType";

/**
 * Composite unique constraint must be set on entity classes and must specify entity's fields to be unique.
 */
export function DeferrableUnique(options: {
    name?: string;
    fields: string[];
    deferrable: DeferrableType;
}): Function {
    return function(clsOrObject: Function | Object, propertyName?: string) {
        const args: UniqueMetadataArgs & { deferrable: DeferrableType } = {
            target: propertyName
                ? clsOrObject.constructor
                : (clsOrObject as Function),
            name: options.name,
            columns: propertyName ? [propertyName] : options.fields,
            deferrable: options.deferrable
        };
        getMetadataArgsStorage().uniques.push(args);
    };
}
