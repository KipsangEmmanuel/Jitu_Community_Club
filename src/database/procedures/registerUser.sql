CREATE PROCEDURE RegisterMember
    @id VARCHAR(36),
    @email VARCHAR(255),
    @cohortNumber INT,
    @password VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Members (id, email, cohortNumber, password)
    VALUES (@id, @email, @cohortNumber, @password);
END;
