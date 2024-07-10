// Transforms raw citizenship data into a format suitable for visualization
const transformCitizenshipSummary = data => {
  return {
    yearResults: [
      {
        fiscal_year: 'Summary',
        // Calculate total cases across all citizenships
        totalCases: data.reduce((acc, cur) => acc + cur.totalCases, 0),
        // Calculate overall grant rate
        granted:
          (data.reduce((acc, cur) => acc + cur.totalGranted, 0) /
            data.reduce((acc, cur) => acc + cur.totalCases, 0)) *
          100,
        // Calculate overall admin closed rate
        adminClosed:
          (data.reduce((acc, cur) => acc + cur.adminClosed, 0) /
            data.reduce((acc, cur) => acc + cur.totalCases, 0)) *
          100,
        // Calculate overall denial rate
        denied:
          (data.reduce((acc, cur) => acc + cur.denied, 0) /
            data.reduce((acc, cur) => acc + cur.totalCases, 0)) *
          100,
        // Transform individual citizenship data
        yearData: data.map(item => ({
          office: item.citizenship,
          totalCases: item.totalCases,
          granted: (item.totalGranted / item.totalCases) * 100,
          adminClosed: (item.adminClosed / item.totalCases) * 100,
          denied: (item.denied / item.totalCases) * 100,
        })),
      },
    ],
  };
};

export { transformCitizenshipSummary };
