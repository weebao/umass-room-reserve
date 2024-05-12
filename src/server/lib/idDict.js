/* This stores all the ids for using the library's AJAX API */

export const buildingNameToId = {
  'dubois': 11076, // W.E.B. Dubois Library
  'sel': 4630 // Science and Engineering Library
};

export const roomTypeToId = {
  'dubois': {
    'groupStudy': 28495
  },
  'sel': {
    'groupStudy': 7862
  }
}

export const roomNameToId = {
  'dubois': {
    'groupStudy': {
      'roomL': 107628,
      'roomM': 107629,
      'roomN': 107630,
      'roomO': 107631,
      'roomP': 107632,
      'roomQ': 107633,
      'roomR': 107635,
      'roomS': 107636,
      'roomT': 107638,
      'roomU': 107640,
      'roomV': 107642,
      'roomW': 107644,
      'roomX': 107645,
      'roomY': 107646,
      'roomZ': 107647,
    }
  },
  'sel': {
    'groupStudy': {
      'roomA': 29570,
      'roomB': 29571,
      'roomC': 29572,
      'roomD': 29573,
      'roomE': 29574,
      'roomF': 29575,
      'roomG': 29576,
      'roomH': 29577
    }
  }
}

/* ---- Reversed ---- */
export const buildingIdToName = {
  11076: 'dubois', // W.E.B. Dubois Library
  4630: 'sel' // Science and Engineering Library
};

export const roomTypeToName = {
  'dubois': {
    28495: 'groupStudy'
  },
  'sel': {
    7862: 'groupStudy'
  }
};

export const roomIdToName = {
  107628: 'Room L',
  107629: 'Room M',
  107630: 'Room N',
  107631: 'Room O',
  107632: 'Room P',
  107633: 'Room Q',
  107635: 'Room R',
  107636: 'Room S',
  107638: 'Room T',
  107640: 'Room U',
  107642: 'Room V',
  107644: 'Room W',
  107645: 'Room X',
  107646: 'Room Y',
  107647: 'Room Z',
  29570: 'Room A',
  29571: 'Room B',
  29572: 'Room C',
  29573: 'Room D',
  29574: 'Room E',
  29575: 'Room F',
  29576: 'Room G',
  29577: 'Room H'
};

export const roomIdToBuilding = {
  107628: 11076,
  107629: 11076,
  107630: 11076,
  107631: 11076,
  107632: 11076,
  107633: 11076,
  107635: 11076,
  107636: 11076,
  107638: 11076,
  107640: 11076,
  107642: 11076,
  107644: 11076,
  107645: 11076,
  107646: 11076,
  107647: 11076,
  29570: 4630,
  29571: 4630,
  29572: 4630,
  29573: 4630,
  29574: 4630,
  29575: 4630,
  29576: 4630,
  29577: 4630
};

export const roomIdToType = {
  107628: 28495,
  107629: 28495,
  107630: 28495,
  107631: 28495,
  107632: 28495,
  107633: 28495,
  107635: 28495,
  107636: 28495,
  107638: 28495,
  107640: 28495,
  107642: 28495,
  107644: 28495,
  107645: 28495,
  107646: 28495,
  107647: 28495,
  29570: 7862,
  29571: 7862,
  29572: 7862,
  29573: 7862,
  29574: 7862,
  29575: 7862,
  29576: 7862,
  29577: 7862
};

/* ---- Misc ---- */
export const shortToFullName = {
  'dubois': 'W.E.B. Dubois Library',
  'sel': 'Science and Engineering Library'
};