const transformCitizenshipSummary = data => {
  return {
    yearResults: [
      {
        fiscal_year: 'Summary',
        totalCases: data.reduce((acc, cur) => acc + cur.totalCases, 0),
        granted:
          (data.reduce((acc, cur) => acc + cur.totalGranted, 0) /
            data.reduce((acc, cur) => acc + cur.totalCases, 0)) *
          100,
        adminClosed:
          (data.reduce((acc, cur) => acc + cur.adminClosed, 0) /
            data.reduce((acc, cur) => acc + cur.totalCases, 0)) *
          100,
        denied:
          (data.reduce((acc, cur) => acc + cur.denied, 0) /
            data.reduce((acc, cur) => acc + cur.totalCases, 0)) *
          100,
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
