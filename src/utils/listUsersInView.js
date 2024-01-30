export default function listUsersInView(
  users,
  positionX,
  positionY,
  screenWidth,
  screenHeight
) {
  const usersInView = [];

  // WRITE SOLUTION BELOW. ADD USERNAME AND IS_BROADCASTER TO 'usersInView' IF USER FALLS INTO VISIBLE RANGE

  for (let peer in users) {
    const x = users[peer].x;
    const y = users[peer].y;

    // Determine distance between peer coords and user coords
    users[peer].distance = getDistance(x, y, positionX, positionY);

    // Determine if peer is within bounds using south west and north east coords
    const sw = [positionX - screenWidth / 2, positionY - screenHeight / 2];
    const ne = [positionX + screenWidth / 2, positionY + screenHeight / 2];
    const withinBounds = isWithinBounds(sw, ne, [x, y]);
    if (withinBounds) {
      usersInView.push(users[peer]);
    }
  }

  // END SOLUTION SECTION

  return usersInView.sort((a, b) => a.distance - b.distance);
}

// Helper function to get distance between two coordinates
function getDistance(x1, y1, x2, y2) {
  let y = x2 - x1;
  let x = y2 - y1;
  return Math.round(Math.sqrt(x * x + y * y) * 100) / 100;
}

// Helper function to determine if peer is within bounds
function isWithinBounds(sw, ne, peer) {
  const isXInRange = peer[0] >= sw[0] && peer[0] <= ne[0];
  const isYInRange = peer[1] >= sw[1] && peer[1] <= ne[1];

  return isXInRange && isYInRange;
}
