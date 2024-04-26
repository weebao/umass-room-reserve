const buildings = [
  {
    building_id: 1,
    name: "W.E.B. Dubois Library",
    img_name: "W.E.B. Dubois Library.jpeg",
  },
  {
    building_id: 2,
    name: "Sciences & Engineering Library",
    img_name: "Sciences & Engineering Library.jpeg",
  },
  {
    building_id: 3,
    name: "Lederle Graduate Research Center",
    img_name: "Lederle Graduate Research Center.jpeg",
  },
  {
    building_id: 4,
    name: "Integrative Learning Center (ILC)",
    img_name: "Integrative Learning Center (ILC).jpeg",
  },
  {
    building_id: 5,
    name: "Integrated Sciences Building",
    img_name: "Integrated Sciences Building.jpeg",
  },
  {
    building_id: 6,
    name: "Business Innovation Hub",
    img_name: "Business Innovation Hub.jpeg",
  },
];

const rooms = [
  {
    room_id: 1,
    building_id: 1,
    room_label: "A",
    room_type: "Learning Commons Group Study Reservation",
  },
  {
    room_id: 2,
    building_id: 1,
    room_label: "B",
    room_type: "Learning Commons Group Study Reservation",
  },
  {
    room_id: 3,
    building_id: 1,
    room_label: "C",
    room_type: "Learning Commons Group Study Reservation",
  },
  {
    room_id: 4,
    building_id: 1,
    room_label: "D",
    room_type: "Learning Commons Group Study Reservation",
  },
  {
    room_id: 5,
    building_id: 2,
    room_label: "A",
    room_type: "Group Study Room",
  },
  {
    room_id: 6,
    building_id: 2,
    room_label: "B",
    room_type: "Group Study Room",
  },
  {
    room_id: 7,
    building_id: 2,
    room_label: "C",
    room_type: "Group Study Room",
  },
  {
    room_id: 7,
    building_id: 2,
    room_label: "C",
    room_type: "Group Study Room",
  },
  {
    room_id: 8,
    building_id: 1,
    room_label: "Extended Reality Room 1",
    room_type: "UMass Digital Media Lab Extended Reality Rooms",
  },
  {
    room_id: 9,
    building_id: 1,
    room_label: "Extended Reality Room 2",
    room_type: "UMass Digital Media Lab Extended Reality Rooms",
  },
];

const users = [
  {
    user_id: 1,
    email: "lionelmessi@gmail.com",
    password: "iamgoat",
    first_name: "Lionel",
    last_name: "Messi",
  },
  {
    user_id: 2,
    email: "cristianoronaldo@gmail.com",
    password: "messiisbetterthanme",
    first_name: "Cristiano",
    last_name: "Ronaldo",
  },
];

export { buildings, rooms, users };
