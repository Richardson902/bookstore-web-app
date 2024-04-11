module.exports.getTaxRate = function (province) {
  //Define tax rates for each province
  const taxRates = {
    NULL: 0.0, //Default value if no province is specified
    AB: 0.05,
    BC: 0.05,
    MB: 0.05,
    NB: 0.15,
    NL: 0.15,
    NS: 0.15,
    NT: 0.05,
    NU: 0.05,
    ON: 0.13,
    PE: 0.15,
    QC: 0.14975,
    SK: 0.11,
    YT: 0.05,
  };

  //Return the tax rate for the specified province
  return taxRates[province];
};
