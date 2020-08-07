import { Client, getMembers } from "./src/mod.ts";
import { findStems } from "./src/queries.ts";
import log from "./src/log.ts";

const logger = log.getLogger();

const client = new Client({
  host: "grouper.oregonstate.edu",
  auth: Deno.env.get("OSU_GROUPER_BASE64_AUTH")
});

(async () => {
  let pageNumber = 5;
  let subjects = undefined;
  let fetchPages = true;
  while (fetchPages) {
    const results = await getMembers(
      client,
      ["osu:ref:stu:level:01"],
      ["name"],
      {
        pageSize: 5000,
        pageNumber
      }
    );
    const groups = results.map(r => r.group);
    subjects = results.flatMap(r => r.subjects?.map(s => s.id));
    logger.debug(pageNumber, groups, subjects);
    fetchPages = subjects.filter(Boolean).length > 0;
    pageNumber += 1;
  }
})();
