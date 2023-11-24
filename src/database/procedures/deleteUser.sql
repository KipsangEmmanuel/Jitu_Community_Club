CREATE PROCEDURE deleteUser
    @id VARCHAR(36)
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM Members
    WHERE id = @id;
END;
