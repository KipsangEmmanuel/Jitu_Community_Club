CREATE PROCEDURE updateUser
    @id VARCHAR(36),
    @username VARCHAR(255),
    @email VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Members
    SET username = @username, email = @email
    WHERE id = @id;
END;
