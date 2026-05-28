const { showPrewiousStudent, setCurrentId, getCurrentId } = require('./script2');

test('Id is 0', () => {
  //Arrange
  CurrentId = 0;
  //Act
  res = showPrewiousStudent()
  //Accert
  expect(res).toBe(4);
});