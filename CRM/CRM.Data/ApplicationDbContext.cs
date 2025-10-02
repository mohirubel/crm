using CRM.Common.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CRM.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Membership> Memberships { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<AspnetPath> Paths { get; set; }
        public DbSet<PersonalizationAllUsers> PersonalizationAllUsers { get; set; }
        public DbSet<PersonalizationPerUser> PersonalizationPerUsers { get; set; }
        public DbSet<SchemaVersion> SchemaVersions { get; set; }
        public DbSet<UsersInRole> UsersInRoles { get; set; }
        public DbSet<WebEvent> WebEvents { get; set; }
        public DbSet<Application> Applications { get; set; }

        // public DbSet<Subscribe> Subscribe { get; set; }
        public DbSet<AccountType> AccountTypes { get; set; }
        public DbSet<AccountHead> AccountHeads { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<TransactionDetail> TransactionDetails { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Application>().ToTable("aspnet_Applications", "security");
            modelBuilder.Entity<Membership>().ToTable("aspnet_Membership", "security");
            modelBuilder.Entity<AspnetPath>().ToTable("aspnet_Paths", "security");
            modelBuilder.Entity<PersonalizationAllUsers>().ToTable("aspnet_PersonalizationAllUsers", "security");
            modelBuilder.Entity<PersonalizationPerUser>().ToTable("aspnet_PersonalizationPerUser", "security");
            modelBuilder.Entity<Profile>().ToTable("aspnet_Profile", "security");
            modelBuilder.Entity<Role>().ToTable("aspnet_Roles", "security");
            modelBuilder.Entity<SchemaVersion>().ToTable("aspnet_SchemaVersions", "security");
            modelBuilder.Entity<User>().ToTable("aspnet_Users", "security");
            modelBuilder.Entity<UsersInRole>().ToTable("aspnet_UsersInRoles", "security");
            modelBuilder.Entity<WebEvent>().ToTable("aspnet_WebEvent_Events", "security");

            modelBuilder.Entity<AccountType>().ToTable("AccountTypes", "Account");
            modelBuilder.Entity<AccountHead>().ToTable("AccountHeads", "Account");
            modelBuilder.Entity<Account>().ToTable("Accounts", "Account");
            modelBuilder.Entity<Transaction>().ToTable("Transactions", "Account");
            modelBuilder.Entity<TransactionDetail>().ToTable("TransactionDetails", "Account");

            modelBuilder.Entity<IdentityUser>(b =>
            {
                b.HasKey(u => u.Id);
                b.HasIndex(u => u.NormalizedUserName).HasDatabaseName("UserNameIndex").IsUnique();
                b.HasIndex(u => u.NormalizedEmail).HasDatabaseName("EmailIndex");
                b.ToTable("AspNetUsers", "security");
            });

            modelBuilder.Entity<IdentityRole>(b =>
            {
                b.HasKey(r => r.Id);
                b.HasIndex(r => r.NormalizedName).HasDatabaseName("RoleNameIndex").IsUnique();
                b.ToTable("AspNetRoles", "security");
            });

            //modelBuilder.Entity<IdentityUserRole<string>>(b =>
            //{
            //    b.HasKey(r => new { r.UserId, r.RoleId });
            //    b.ToTable("AspNetUserRoles", "security");
            //});

            modelBuilder.Entity<UsersInRole>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RoleId }); // composite PK
                entity.ToTable("aspnet_UsersInRoles", "security");

                // Optional: if you want to define relationships
                entity.HasOne<User>()
                      .WithMany()
                      .HasForeignKey(e => e.UserId);

                entity.HasOne<Role>()
                      .WithMany()
                      .HasForeignKey(e => e.RoleId);
            });


            modelBuilder.Entity<IdentityUserClaim<string>>(b =>
            {
                b.HasKey(uc => uc.Id);
                b.ToTable("AspNetUserClaims", "security");
            });

            modelBuilder.Entity<IdentityUserLogin<string>>(b =>
            {
                b.HasKey(l => new { l.LoginProvider, l.ProviderKey });
                b.ToTable("AspNetUserLogins", "security");
            });

            modelBuilder.Entity<IdentityRoleClaim<string>>(b =>
            {
                b.HasKey(rc => rc.Id);
                b.ToTable("AspNetRoleClaims", "security");
            });

            modelBuilder.Entity<IdentityUserToken<string>>(b =>
            {
                b.HasKey(t => new { t.UserId, t.LoginProvider, t.Name });
                b.ToTable("AspNetUserTokens", "security");
            });

            modelBuilder.Entity<AccountHead>(entity =>
            {
                entity.HasKey(e => e.HeadID);
                entity.ToTable("AccountHeads", "Account");
            });


        }
    }
}
