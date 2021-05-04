import { Types, User } from '@osu-wams/lib';
/**
 * Filters Resources to return just the ones a specific user has marked as favorite
 * @param favoriteResources
 * @param resourcesList
 */
export const activeFavoriteResources = (
  favoriteResources: Types.FavoriteResource[],
  resourcesList: Types.Resource[],
) => {
  const some = favoriteResources.filter(f => resourcesList.some(r => f.resourceId === r.id) && f.active);
  return some.map(f => ({ ...f, resource: resourcesList.filter(r => f.resourceId === r.id)[0] }));
};
/**
 * Filter a list of resources where it has a category in its list matching the provided name
 * parameter unless the category is 'all'.
 * @param {string} name the category name to filter on
 * @param {Resource[]} resources a list of resources to inspect for matching category
 */
export const filterByCategory = (user: any, name: string, resources: Types.Resource[]): Types.Resource[] => {
  // Skips categories and displays all resources
  if (name === 'all') return resources;

  // Skips categories and filters based on user favorite preferences
  if (name === 'favorites' && user.favoriteResources) {
    return activeFavoriteResources(user.favoriteResources, resources).map(f => f.resource);
  }

  return resources.filter(
    resource =>
      resource.categories?.length > 0 &&
      resource.categories.findIndex(s => s.toLowerCase().includes(name.toLowerCase())) > -1,
  );
};

/**
 * Checks the affiliation data coming from user and determines if an object with affiliation data
 * should or should not appear for the given user.
 * @param o object having an affiliation string array
 * @returns {boolean} true or false depending if the item is associated with the current affiliation
 */
export const checkAffiliation = (user: any, o: { affiliation: string[] }): boolean => {
  const userAffiliation = User.getAffiliation(user).toLowerCase();
  return (
    o.affiliation?.length === 0 ||
    o.affiliation?.map(a => a.toLowerCase()).filter(a => a === userAffiliation).length > 0
  );
};
