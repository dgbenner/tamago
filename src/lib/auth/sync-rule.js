// What to do when this course's device progress and the account's copy meet (Dan, 2026-11-11). The device keeps a
// marker of its last sync with each account (when the account's copy was saved, and the lessons the device had):
//   upload    the account has nothing, or hasn't changed since this device last synced: the device's goes up
//   download  the device has nothing, or hasn't changed since its last sync while the account has: the account's comes down
//   ask       both have progress and neither of the above holds: the learner picks, seeing both counts
//   same      nothing changed on either side since the last sync
//   none      neither has anything
export function chooseSync({ local, remote, marker }) {
  if (!remote?.any) return local.any ? 'upload' : 'none'
  if (!local.any) return 'download'
  if (marker && marker.saved_at === remote.saved_at) return marker.lessons === local.lessons ? 'same' : 'upload'
  if (marker && marker.lessons === local.lessons) return 'download'
  return 'ask'
}
