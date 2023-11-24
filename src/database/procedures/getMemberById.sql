CREATE PROCEDURE getMemberById
    @id VARCHAR(36)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * FROM Members
    WHERE id = @id;
END;
